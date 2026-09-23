"""Editable Garden v1. Blender Z-up metres; helper positions use runtime Y-up.
Exporter maps (x, y, z) Blender to (x, z, -y) glTF. No UI scene touched.
"""
import bpy, math, pathlib, json
from mathutils import Vector
ROOT=pathlib.Path(__file__).resolve().parents[1]
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def coord(p):return (p[0],-p[2],p[1])
def mat(name,color,metal=0):
 color=tuple(v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in color)
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
 bs=m.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=(*color,1);bs.inputs['Roughness'].default_value=.72;bs.inputs['Metallic'].default_value=metal
 return m
wood=mat('Warm oak',(.43,.32,.20));edge=mat('Cut oak',(.57,.42,.27));cloth=mat('Terracotta canvas',(.60,.39,.27));cream=mat('Canvas hem',(.86,.7,.43));iron=mat('Brushed brass',(.45,.34,.17),.55);dark=mat('Record charcoal',(.014,.019,.018));soil=mat('Soil',(.095,.065,.028));leafmat=mat('Sage',(.4,.48,.27));potmat=mat('Fired clay',(.66,.40,.26));paper=mat('Sleeve placeholder',(.88,.82,.66))
def group(name,loc=(0,0,0),parent=None):
 o=bpy.data.objects.new(name,None);bpy.context.collection.objects.link(o);o.location=coord(loc);o.parent=parent;return o
def finish(o,name,loc,scale,material,parent,bevel=0):
 o.name=name;o.location=coord(loc);o.scale=(scale[0],scale[2],scale[1]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if material:o.data.materials.append(material)
 if bevel:
  mod=o.modifiers.new('Soft crafted edges','BEVEL');mod.width=bevel;mod.segments=2
  bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=mod.name)
 o.parent=parent;return o
def box(name,p,s,m,parent=None,bevel=.015):
 bpy.ops.mesh.primitive_cube_add(size=1);return finish(bpy.context.object,name,p,s,m,parent,bevel)
def cyl(name,p,r,depth,m,parent=None,r2=None):
 bpy.ops.mesh.primitive_cone_add(vertices=32,radius1=r if r2 is None else r2,radius2=r,depth=depth)
 return finish(bpy.context.object,name,p,(1,1,1),m,parent,.005)
def rod(name,a,b,r,m,parent):
 av,bv=Vector(coord(a)),Vector(coord(b));bpy.ops.mesh.primitive_cylinder_add(vertices=10,radius=r,depth=(bv-av).length,location=(av+bv)*.5)
 o=bpy.context.object;o.name=name;o.rotation_euler=(bv-av).to_track_quat('Z','Y').to_euler();o.data.materials.append(m);o.parent=parent;return o
stall=group('stall_root',(2.65,0,0))
for x in [-1.67,1.67]:
 for z in [-.38,.58]:box('Oak upright',(x,1.52,z),(.095,3.04,.095),wood,stall)
for y in [.28,1.0]:
 box('Front rail',(0,y,.56),(3.43,.11,.08),edge,stall)
 box('Rear rail',(0,y,-.37),(3.43,.11,.08),wood,stall)
for i in range(6):box('Counter plank',(0,1.05,-.39+i*.19),(3.64,.10,.177),edge if i%2 else wood,stall,.018)
# Canopy split: same sober canvas, raised ridge, open ends.
for sign in [-1,1]:
 o=box('Canopy',(0,3.16,sign*.39),(3.85,.045,.84),cloth,stall,.015);o.rotation_euler.x=sign*math.radians(13)
for z in [-.80,.80]:box('Canvas valance',(0,2.99,z),(3.85,.21,.04),cloth,stall,.015)
box('Woven hem',(0,2.89,.825),(3.87,.035,.025),cream,stall,.003)
for y in [2.69,1.91]:
 rod('Hanging cord',(-1.64,y,.55),(1.64,y,.55),.012,cream,stall)
for i in range(6):
 x=(i%3-1)*1.03;y=2.29 if i<3 else 1.51
 # front plane's UVs remain independent for catalog cover textures
 bpy.ops.mesh.primitive_plane_add(size=1)
 o=finish(bpy.context.object,f'sleeve_{i+1:02}',(x,y,.62),(.73,.73,1),paper,stall)
 # Reset dimensions explicitly: local XY square, rotate upright facing front.
 o.scale=(1,1,1);o.rotation_euler.x=math.pi/2
 for v in o.data.vertices:v.co.x=math.copysign(.365,v.co.x);v.co.y=math.copysign(.365,v.co.y)
 box('Sleeve back',(x,y,.597),(.75,.75,.02),cream,stall,.006)
 box('Wooden clip',(x,y+.395,.64),(.055,.10,.065),wood,stall,.003)
# crate below desk
for z in [-.28,.35]:
 for j in range(3):box('Crate slat',(.85,.24+j*.15,z),(1.05,.10,.06),edge,stall)
for x in [.33,1.37]:box('Crate end',(x,.39,.03),(.06,.46,.65),wood,stall)
for i in range(6):box('Stored sleeve',(.85,.50,-.20+i*.085),(.79,.58,.025),paper if i%2 else cloth,stall,.003)
box('Listening shelf',(-.80,.98,1.05),(1.40,.09,.83),edge,stall)
tt=group('turntable_root',(-.76,1.09,1.02),stall)
box('Turntable body',(0,0,0),(1.0,.12,.64),wood,tt,.035)
box('Turntable top',(0,.065,0),(.94,.025,.59),dark,tt,.015)
lid=box('Turntable lid',(0,.09,-.49),(1.0,.035,.40),wood,tt);lid.rotation_euler.x=math.radians(-20)
platter=group('platter_pivot',(-.12,.09,.04),tt)
cyl('Platter', (0,0,0),.25,.024,iron,platter)
cyl('vinyl',(0,.019,0),.242,.012,dark,platter)
cyl('label',(0,.027,0),.077,.004,cloth,platter)
box('Label mark',(.025,.031,.007),(.018,.003,.045),cream,platter,.001)
cyl('Spindle',(0,.04,0),.011,.035,iron,platter)
tone=group('tonearm_pivot',(.33,.13,-.18),tt)
cyl('Arm base',(0,0,0),.035,.10,iron,tone)
rod('Tonearm',(0,.06,0),(-.10,.065,.34),.012,iron,tone)
box('Cartridge',(-.10,.045,.34),(.065,.045,.06),dark,tone,.004)
planter=group('planter_root',(.03,0,1.0))
cyl('Clay pot',(0,.30,0),.31,.56,potmat,planter,r2=.235)
cyl('Clay rim',(0,.585,0),.335,.075,potmat,planter)
cyl('Soil',(0,.625,0),.298,.008,soil,planter)
rod('Stem',(0,.63,0),(.03,1.14,0),.014,leafmat,planter)
for i in range(5):
 a=i*2.4;h=.78+i*.075
 anchor=group(f'leaf_{i+1:02}',(0,h,0),planter)
 # ellipsoid with origin at stem; leaf anchor is runtime pivot
 bpy.ops.mesh.primitive_uv_sphere_add(segments=12,ring_count=6)
 o=finish(bpy.context.object,'Leaf blade',(.13*math.cos(a),.07,.13*math.sin(a)),(.21,.045,.095),leafmat,anchor)
 o.rotation_euler.z=-a
# Semantic anchors exported as nodes.
group('li_anchor',(-1.23,0,.30));group('hand_target',(.04,1.08,1.0));group('contact_shadow',(0,.005,0))
# Ground deliberately small; backdrop remains a distant flat projection.
ground=box('ground_near',(0,-.06,.1),(12,.10,6),mat('Warm earth',(.46,.39,.25)),bevel=.02)
# 3 pooled foreground clusters, instanced later in runtime.
foliage=group('foliage_root',(-2.35,0,.8))
for i in range(7):
 a=i*2.399;r=.14+.06*(i%3)
 bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2,radius=1)
 o=finish(bpy.context.object,'Garden foliage',(math.sin(a)*r,.20+(.12 if i%2 else 0),math.cos(a)*r),(.18,.30,.16),leafmat,foliage)
# First round-trip export one object, then complete set. Source is fully editable.
bpy.ops.object.select_all(action='DESELECT');bpy.data.objects['Clay pot'].select_set(True)
bpy.ops.export_scene.gltf(filepath=str(ROOT/'source/garden/v1/planter-roundtrip.glb'),export_format='GLB',use_selection=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'source/garden/v1/garden-models-v1.blend'))
bpy.ops.export_scene.gltf(filepath=str(ROOT/'assets/garden/v1/garden-models-v1.glb'),export_format='GLB',export_yup=True,export_apply=True)
report={'units':'metres','Blender_to_glTF':'(x,y,z) -> (x,z,-y)','objects':len(bpy.data.objects),'triangles':sum(len(o.data.loop_triangles) for o in bpy.data.objects if o.type=='MESH'),'source':'source/garden/v1/garden-models-v1.blend'}
(ROOT/'source/garden/v1/model-build.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report))
