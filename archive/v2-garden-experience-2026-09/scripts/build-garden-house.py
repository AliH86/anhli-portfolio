"""Authored Garden house geometry, source parts retained; joined-by-material GLB.
Architecture draft: no production texture/AO pass yet. Coordinates stay locked.
"""
import bpy,math,json,random
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];SRC=ROOT/'source/garden/production';OUT=ROOT/'assets/garden/production'
study=json.loads((SRC/'camera-study.json').read_text());bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.preferences.filepaths.save_version=0
def xyz(p):return(p[0],-p[2],p[1])
def mat(name,c,rough=.85,metal=0):
 m=bpy.data.materials.new(name);m.diffuse_color=(*c,1);m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*c,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
 return m
plaster=mat('Warm lime plaster',(.76,.71,.59));stone=mat('Limestone plinth',(.47,.46,.38));wood=mat('Weathered dark moss timber',(.145,.21,.15));oak=mat('Porch timber',(.36,.27,.16));glass=mat('Quiet blue green window glass',(.09,.20,.21),.22,.15);metal=mat('Aged brass details',(.34,.25,.12),.4,.65)
roofmats=[mat('Clay tile variation '+str(i),c) for i,c in enumerate([(.39,.18,.10),(.46,.23,.14),(.42,.20,.12),(.50,.27,.17)])]
parts=[]
def box(name,loc,size,material,bevel=.025):
 bpy.ops.mesh.primitive_cube_add(size=1,location=xyz(loc));o=bpy.context.object;o.name=name;o.dimensions=(size[0],size[2],size[1]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(material)
 if bevel:
  mod=o.modifiers.new('Soft construction edges','BEVEL');mod.width=bevel;mod.segments=2;bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
 parts.append(o);return o
def mesh(name,verts,faces,material):
 me=bpy.data.meshes.new(name);me.from_pydata([xyz(v) for v in verts],[],faces);me.update();o=bpy.data.objects.new(name,me);bpy.context.collection.objects.link(o);o.data.materials.append(material);parts.append(o);return o
def beam(name,a,b,width,material):
 av,bv=Vector(xyz(a)),Vector(xyz(b));bpy.ops.mesh.primitive_cylinder_add(vertices=8,radius=width/2,depth=(bv-av).length,location=(av+bv)/2);o=bpy.context.object;o.name=name;o.rotation_euler=(bv-av).to_track_quat('Z','Y').to_euler();o.data.materials.append(material);parts.append(o);return o

# Openings are built into the facade rather than pasted onto a solid box.
box('Foundation',[0,.12,0],[7.2,.24,5.2],stone,.045)
for name,x0,x1 in [('Left pier',-3.5,-2.3),('Middle pier',-1.1,.7),('Right pier',2.3,3.5)]:box(name,[(x0+x1)/2,1.7,2.48],[x1-x0,3.0,.22],plaster)
box('Facade lintel',[0,2.99,2.48],[7,.42,.22],plaster)
box('Window parapet',[1.5,.60,2.48],[1.6,.80,.22],plaster)
box('Window lintel',[1.5,2.63,2.48],[1.6,.30,.22],plaster)
for x in [-3.4,3.4]:box('Side wall',[x,1.7,0],[.2,3.0,5],plaster)
box('Rear wall',[0,1.7,-2.4],[7,3,.2],plaster)
for z in [-2.42,2.48]:mesh('Gable plaster',[[-3.5,3.2,z],[3.5,3.2,z],[0,6.1,z]],[(0,1,2)],plaster)
for z in [-2.5,2.58]:
 for a,b in [([-3.55,3.2,z],[0,6.18,z]),([0,6.18,z],[3.55,3.2,z])]:beam('Gable timber fascia',a,b,.16,wood)
 beam('Gable cross beam',[-3.5,3.24,z],[3.5,3.24,z],.14,wood)
beam('Gable centre post',[0,3.25,2.6],[0,6.12,2.6],.12,wood)

# Pane, inset frame, shutters and a small upper vent provide depth at all angles.
def window(cx,cy,z,w,h):
 box('Window inset',[cx,cy,z-.045],[w,h,.10],wood,.012)
 box('Window glass',[cx,cy,z+.01],[w-.16,h-.16,.03],glass,.008)
 for x in [cx-w/2,cx+w/2]:box('Window jamb',[x,cy,z+.08],[.08,h+.12,.10],wood,.01)
 for y in [cy-h/2,cy+h/2]:box('Window rail',[cx,y,z+.08],[w+.10,.08,.10],wood,.01)
 box('Window centre mullion',[cx,cy,z+.10],[.05,h,.08],wood,.01)
 box('Window crossbar',[cx,cy+.06,z+.10],[w,.045,.08],wood,.005)
 box('Stone window sill',[cx,cy-h/2-.055,z+.10],[w+.25,.11,.36],stone,.018)
window(1.5,1.74,2.58,1.58,1.36);window(0,4.12,2.53,.72,.78)
for side in [-1,1]:
 sx=1.5+side*1.12
 for j in range(9):box('Shutter louvre',[sx,1.13+j*.145,2.64],[.53,.10,.07],wood,.009)
 for dx in [-.27,.27]:box('Shutter stile',[sx+dx,1.74,2.65],[.05,1.42,.09],wood,.009)
box('Door inset',[-1.7,1.44,2.48],[1.18,2.46,.12],wood,.018)
for j in range(7):box('Door vertical plank',[-2.21+j*.17,1.45,2.58],[.155,2.37,.08],oak,.008)
for x in [-2.34,-1.06]:box('Door frame',[x,1.46,2.60],[.10,2.56,.15],wood,.014)
box('Door top frame',[-1.7,2.72,2.60],[1.4,.10,.15],wood,.014)
beam('Door handle',[-1.23,1.30,2.72],[-1.23,1.52,2.72],.035,metal)

# Tiled pitched roof: individual shallow curved tile surfaces, batched by colour.
rng=random.Random(1212);batches=[([],[]) for _ in roofmats]
for side in [-1,1]:
 for row in range(16):
  x0=.02+row*3.78/16;x1=min(3.86,x0+3.78/16+.045)
  for col in range(21):
   z0=-2.88+col*.282;verts,faces=batches[rng.randrange(len(batches))];start=len(verts)
   for x in [x0,x1]:
    for k in range(7):
     z=z0+k*.282/6;y=6.16-x*(3.00/3.78)+.055*math.sin(k*math.pi/6)
     verts.append([side*x,y,z])
   for k in range(6):
    f=(start+k,start+k+1,start+8+k,start+7+k)
    faces.append(f if side<0 else tuple(reversed(f)))
for i,(vs,fs) in enumerate(batches):
 o=mesh('Curved clay roof tiles '+str(i),vs,fs,roofmats[i])
 for poly in o.data.polygons:poly.use_smooth=True
for z in [-2.95+j*.29 for j in range(21)]:beam('Ridge cap',[0,6.20,z],[0,6.20,z+.27],.17,roofmats[1])
for x in [-3.78,3.78]:beam('Eave fascia',[x,3.12,-2.94],[x,3.12,3.0],.18,wood)

# Porch is part of the architecture. No loose garden props added.
for j in range(24):box('Porch deck plank',[-3.70+j*.32,.20,3.16],[.30,.13,1.2],oak,.009)
for i in range(3):box('Porch step',[-1.7,.05-i*.07,3.82+i*.24],[1.6,.14,.32],stone,.02)
for x in [-3.4,3.4]:
 box('Porch post',[x,1.50,3.59],[.13,2.6,.13],wood,.016)
 beam('Porch bracket',[x,2.15,3.59],[x-.38*(1 if x>0 else -1),2.73,3.59],.09,wood)
box('Porch header',[0,2.82,3.59],[7.0,.16,.16],wood,.02)
# Slim porch cover does not compete with the main roof silhouette.
for j in range(22):box('Porch cover slat',[-3.52+j*.335,2.91,3.06],[.31,.09,1.25],oak,.01)

root=bpy.data.objects.new('garden_house_root',None);bpy.context.collection.objects.link(root)
for o in parts:o.parent=root
root.rotation_euler.z=math.pi/2
root.location=xyz(study['envelopes']['house']['position'])
root['locked_x']=-14;root['locked_z']=-6;root['door_direction']='+x';root['status']='architecture draft; texture/AO/detail review pending'
bpy.context.scene['status']='Garden House architecture source, not approved final art'
bpy.ops.wm.save_as_mainfile(filepath=str(SRC/'garden-house.blend'))

# Runtime consolidation happens after saving editable source parts.
groups={}
for o in parts:groups.setdefault(o.data.materials[0].name,[]).append(o)
for name,objects in groups.items():
 bpy.ops.object.select_all(action='DESELECT')
 for o in objects:o.select_set(True)
 bpy.context.view_layer.objects.active=objects[0]
 if len(objects)>1:bpy.ops.object.join()
 bpy.context.object.name='house_'+name.replace(' ','_')
bpy.ops.export_scene.gltf(filepath=str(OUT/'garden-house.glb'),export_format='GLB',export_extras=True)
objects=[o for o in bpy.data.objects if o.type=='MESH'];tri=sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in objects)
receipt={'status':'architecture draft; not approved; no production texture/AO pass','source':'source/garden/production/garden-house.blend','runtime':'assets/garden/production/garden-house.glb','triangles':tri,'runtimeMeshes':len(objects),'sourceParts':len(parts),'glbBytes':(OUT/'garden-house.glb').stat().st_size,'materials':len(groups),'textures':0,'doorDirection':'+x','worldXZ':[-14,-6]}
(ROOT/'docs/qa/garden-proof/house-build-receipt.json').write_text(json.dumps(receipt,indent=2)+'\n');print(json.dumps(receipt))
