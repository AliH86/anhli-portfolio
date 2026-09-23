"""Blender source + GLB for composition diagnostics. Never final environment art."""
from pathlib import Path
import bpy, math, json
from mathutils import Vector

ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'source/garden/production'
OUT=ROOT/'assets/garden/production'
study=json.loads((SRC/'camera-study.json').read_text())
lock=json.loads((SRC/'composition-lock.json').read_text())
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.scene.unit_settings.system='METRIC'
bpy.context.scene['status']='COMPOSITION STUDY ONLY; envelopes are not production architecture'
bpy.context.scene['source']='Locked Handoff WP-01; numeric x/z preserved, footing y provisional'

def xyz(p): return (p[0],-p[2],p[1])
def material(name,color):
    m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
    bsdf=m.node_tree.nodes.get('Principled BSDF');bsdf.inputs['Base Color'].default_value=(*color,1)
    bsdf.inputs['Roughness'].default_value=.9
    return m
soil=material('Study meadow — neutral surface',(0.42,.48,.31))
watermat=material('Secondary water envelope',(0.38,.52,.54))
colors={'house':(.64,.59,.47),'workspace':(.47,.53,.43),'greenhouse':(.63,.73,.68),'stall':(.69,.39,.25)}
def smooth(a,b,t):
    t=max(0,min(1,(t-a)/(b-a)));return t*t*(3-2*t)
def height(x,z):
    # Provisional downhill grade from arrival toward the garden, smooth footings.
    h=-2.5+2.5*smooth(2,28,z)
    # Background landscape: bounded z at the supplied -48..-64 hill band.
    h+=5.5*math.exp(-((z+57)/10)**2)*(.55+.25*math.sin(x*.105)+.17*math.cos(x*.23))
    h+=.18*math.sin(x*.17)*math.cos(z*.12)*(1-smooth(-35,-10,z))
    for name,item in study['envelopes'].items():
        px,py,pz=item['position'];w,_,d=item['size']
        distance=max(abs(x-px)-w/2,abs(z-pz)-d/2,0)
        weight=1-smooth(.5,4,distance)
        h=h*(1-weight)+py*weight
    return h

verts=[];faces=[];nx,nz=112,164
for j in range(nz+1):
    z=-76+j*164/nz
    for i in range(nx+1):
        x=-48+i*112/nx;verts.append(xyz([x,height(x,z),z]))
for j in range(nz):
    for i in range(nx):
        a=j*(nx+1)+i;faces.append((a,a+nx+1,a+nx+2,a+1))
mesh=bpy.data.meshes.new('terrain-elevation-study');mesh.from_pydata(verts,[],faces);mesh.update()
terrain=bpy.data.objects.new('terrain_elevation_STUDY',mesh);bpy.context.collection.objects.link(terrain);terrain.data.materials.append(soil)
for p in mesh.polygons:p.use_smooth=True
terrain['status']='draft; footing elevations provisional; not final landscape'
for name,item in study['envelopes'].items():
    x,y,z=item['position'];w,h,d=item['size']
    bpy.ops.mesh.primitive_cube_add(size=1,location=xyz([x,y+h/2,z]))
    obj=bpy.context.object;obj.name=name+'_ENVELOPE_NOT_ART';obj.dimensions=(w,d,h)
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    obj.data.materials.append(material(name+' study colour',colors[name]))
    obj['locked_x']=x;obj['locked_z']=z;obj['footing_y_provisional']=y
    obj['status']='diagnostic envelope; not a production asset'

# This surface only marks water's approved location; shape and material remain draft.
wx,wz=lock['secondary']['water']['xz'];wy=height(wx,wz)+.03
waterverts=[xyz([wx+3.8*math.cos(i*math.tau/48),wy,wz+1.8*math.sin(i*math.tau/48)]) for i in range(48)]
wm=bpy.data.meshes.new('water-location-study');wm.from_pydata(waterverts,[],[tuple(range(47,-1,-1))]);wm.update()
wo=bpy.data.objects.new('water_LOCATION_STUDY',wm);bpy.context.collection.objects.link(wo);wo.data.materials.append(watermat)
wo['status']='approved x/z; provisional shape; no shader'

for name,loc in [('yard_min',[-6,height(-6,2),2]),('yard_max',[8,height(8,12),12]),('show_structure',[12,height(12,6),6])]:
    obj=bpy.data.objects.new(name+'_ANCHOR',None);obj.location=xyz(loc);bpy.context.collection.objects.link(obj)

pose=study['fit'];yaw=pose['yawRadians'];pitch=math.radians(pose['pitchDownDegrees'])
cam_data=bpy.data.cameras.new('A1_vFOV38');cam=bpy.data.objects.new('A1_ARRIVAL_STUDY',cam_data)
bpy.context.collection.objects.link(cam);cam.location=xyz(pose['position']);cam_data.type='PERSP'
cam_data.sensor_fit='VERTICAL';cam_data.sensor_height=24;cam_data.lens=12/math.tan(math.radians(38)/2)
forward=Vector((math.sin(yaw)*math.cos(pitch),math.cos(yaw)*math.cos(pitch),-math.sin(pitch)))
cam.rotation_euler=forward.to_track_quat('-Z','Y').to_euler();bpy.context.scene.camera=cam
bpy.context.scene.render.resolution_x=1920;bpy.context.scene.render.resolution_y=1080
SRC.mkdir(parents=True,exist_ok=True);OUT.mkdir(parents=True,exist_ok=True)
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(SRC/'garden-space-study.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT/'garden-space-study.glb'),export_format='GLB',export_extras=True,export_cameras=False,export_lights=False)
triangles=sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in bpy.data.objects if o.type=='MESH')
receipt={'status':'draft composition geometry, not final art','blender':bpy.app.version_string,'triangles':triangles,
         'vertices':sum(len(o.data.vertices) for o in bpy.data.objects if o.type=='MESH'),
         'glbBytes':(OUT/'garden-space-study.glb').stat().st_size,
         'blend':'source/garden/production/garden-space-study.blend','runtime':'assets/garden/production/garden-space-study.glb',
         'textureCount':0,'envelopes':study['envelopes'],'limitations':['No production architecture, host, vegetation or textures','No approval of terrain elevations','Yard/horizon and A2/A3 require further composition review']}
(ROOT/'docs/qa/garden-proof/blender-receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps({k:v for k,v in receipt.items() if k!='envelopes'}))
