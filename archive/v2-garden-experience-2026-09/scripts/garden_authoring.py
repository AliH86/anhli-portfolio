"""Garden checkpoint B: editable stall and greenhouse, authored from art board.
Run using Blender --background --python scripts/build-garden-architecture.py.
No existing house, terrain, v1 or portfolio files are rewritten.
"""
import bpy, math, json, random, re
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'source/garden/production'; OUT=ROOT/'assets/garden/production'
QA=ROOT/'docs/qa/garden-architecture-2026-09-13'
STUDY=json.loads((SRC/'camera-study.json').read_text())
RNG=random.Random(913)
def xyz(p): return (p[0],-p[2],p[1])
def fresh():
 global parts, materials
 bpy.ops.wm.read_factory_settings(use_empty=True)
 bpy.context.preferences.filepaths.save_version=0
 bpy.context.scene.unit_settings.system='METRIC'
 parts=[];materials={}
def material(name,color,rough=.8,metal=0,alpha=1,texture=None):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,alpha);m.use_nodes=True
 bs=next((n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED'),None)
 if bs is None:bs=m.node_tree.nodes.new('ShaderNodeBsdfPrincipled')
 output=next((n for n in m.node_tree.nodes if n.type=='OUTPUT_MATERIAL'),None)
 if output is None:output=m.node_tree.nodes.new('ShaderNodeOutputMaterial')
 m.node_tree.links.new(bs.outputs['BSDF'],output.inputs['Surface'])
 bs.inputs['Base Color'].default_value=(*color,alpha);bs.inputs['Roughness'].default_value=rough
 bs.inputs['Metallic'].default_value=metal;bs.inputs['Alpha'].default_value=alpha
 if alpha<1:m.surface_render_method='BLENDED';m.use_backface_culling=False
 if texture:
  image=bpy.data.images.load(str(texture),check_existing=True);image.pack()
  tex=m.node_tree.nodes.new('ShaderNodeTexImage');tex.image=image
  m.node_tree.links.new(tex.outputs['Color'],bs.inputs['Base Color'])
 materials[name]=m;return m
def palette():
 return {
 'wood':material('Weathered natural timber',(.48,.38,.265),texture=SRC/'textures/weathered-timber.png'),
 'dark':material('Dark matte garden trim',(.095,.125,.095)),
 'canvas':material('Unbleached woven canvas',(.86,.82,.70),.95,texture=SRC/'textures/woven-canvas.png'),
 'stone':material('Weathered limestone',(.43,.43,.36)),
 'metal':material('Dark iron hardware',(.055,.063,.055),.56,.7),
 'brass':material('Aged brass',(.39,.28,.12),.48,.65),
 'black':material('Record and rubber',(.018,.021,.018),.38),
 'paper':material('Warm paper',(.74,.71,.59)),
 'clay':material('Terracotta',(.39,.215,.13)),
 'soil':material('Potting soil',(.065,.05,.026)),
 'leaf':material('Mature leaf green',(.13,.205,.075)),
 'leaflight':material('New leaf green',(.235,.30,.12)),
 'glass':material('Quiet weathered glass',(.61,.72,.69),.28,.04,.13),
 'glassvar':material('Weathered glass variation',(.57,.67,.61),.38,.03,.20)
 }
def remember(o,name,mat):
 o.name=name
 if mat:o.data.materials.append(mat)
 parts.append(o);return o
def box(name,loc,size,mat,bevel=.008):
 bpy.ops.mesh.primitive_cube_add(size=1,location=xyz(loc));o=bpy.context.object
 o.dimensions=(size[0],size[2],size[1]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  mod=o.modifiers.new('Soft edges','BEVEL');mod.width=bevel;mod.segments=2
  bpy.ops.object.modifier_apply(modifier=mod.name)
 return remember(o,name,mat)
def beam(name,a,b,width,mat):
 av,bv=Vector(xyz(a)),Vector(xyz(b));o=box(name,[0,0,0],[width,(bv-av).length,width],mat,min(.008,width*.1))
 o.location=(av+bv)/2;o.rotation_euler=(bv-av).to_track_quat('Z','Y').to_euler();return o
def cylinder(name,loc,radius,depth,mat,r2=None,n=24):
 bpy.ops.mesh.primitive_cone_add(vertices=n,radius1=radius,radius2=radius if r2 is None else r2,depth=depth,location=xyz(loc))
 o=remember(bpy.context.object,name,mat)
 for p in o.data.polygons:p.use_smooth=len(p.vertices)==4
 return o
def mesh(name,verts,faces,mat,uv=None):
 me=bpy.data.meshes.new(name);me.from_pydata([xyz(v) for v in verts],[],faces);me.update()
 o=bpy.data.objects.new(name,me);bpy.context.collection.objects.link(o);remember(o,name,mat)
 if uv:
  layer=me.uv_layers.new(name='UVMap')
  for poly in me.polygons:
   for li in poly.loop_indices:layer.data[li].uv=uv[me.loops[li].vertex_index]
 return o
def empty(name,loc=(0,0,0),parent=None):
 o=bpy.data.objects.new(name,None);bpy.context.collection.objects.link(o);o.location=xyz(loc);o.parent=parent;return o
def parent_keep(o,p):
 bpy.context.view_layer.update();w=o.matrix_world.copy();o.parent=p;o.matrix_world=w

def potted_plant(x,y,z,scale=1,seed=0):
 rng=random.Random(seed);h=.35*scale;r=.20*scale
 cylinder('Clay pot body',[x,y+h/2,z],r*.7,h,P['clay'],r2=r)
 cylinder('Rolled pot rim',[x,y+h-.025*scale,z],r*1.08,.05*scale,P['clay'])
 cylinder('Soil visible in pot',[x,y+h+.002,z],r*.92,.012,P['soil'])
 verts=[];faces=[]
 for s in range(4):
  a=rng.random()*math.tau;length=(.48+rng.random()*.55)*scale
  tip=[x+math.cos(a)*.14*scale,y+h+length,z+math.sin(a)*.14*scale]
  beam('Plant stem',[x,y+h,z],tip,.012*scale,P['leaf'])
  for i in range(5):
   t=.24+i*.15;yy=y+h+length*t;aa=a+i*2.399
   center=Vector([x+(tip[0]-x)*t,yy,z+(tip[2]-z)*t])
   d=Vector([math.cos(aa),.30,math.sin(aa)])*(.21+(1-t)*.13)*scale
   side=Vector([-math.sin(aa),0,math.cos(aa)])*.072*scale
   v=[center,center+d*.52+side,center+d+Vector([0,-.065*scale,0]),center+d*.52-side,center+d*.5+Vector([0,.033*scale,0])]
   k=len(verts);verts.extend([list(q) for q in v]);faces.extend([(k,k+1,k+4),(k+1,k+2,k+4),(k+2,k+3,k+4),(k+3,k,k+4)])
 o=mesh('Authored broad leaves',verts,faces,P['leaflight'] if seed%3==0 else P['leaf'])
 for p in o.data.polygons:p.use_smooth=True
 o.data.materials[0].use_backface_culling=False

def export_asset(asset,root,handles=()):
 # Recalculate closed construction normals, keep deliberate thin sheets double-sided.
 for o in parts:
  if o.type=='MESH':
   bpy.context.view_layer.objects.active=o;bpy.ops.object.select_all(action='DESELECT');o.select_set(True)
   bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.mesh.normals_make_consistent(inside=False);bpy.ops.object.mode_set(mode='OBJECT')
   if o.parent is None:o.parent=root
 root.location=xyz(STUDY['envelopes'][asset]['position'])
 root['locked_x']=STUDY['envelopes'][asset]['position'][0];root['locked_z']=STUDY['envelopes'][asset]['position'][2]
 root['status']='architecture proof candidate; scenic material/light pass pending'
 bpy.context.scene['art_reference']='DANDELION_GARDEN_ART_DIRECTION_BOARD (1).pptx slides 3,5,6,7,9'
 bpy.context.scene['status']='Editable architecture source; not accepted final Garden'
 source=SRC/f'garden-{asset}.blend';runtime=OUT/f'garden-{asset}.glb'
 bpy.ops.wm.save_as_mainfile(filepath=str(source))
 sourceparts=len(parts)
 groups={}
 for o in parts:
  if o.name in handles:continue
  # Animated parts must retain their local parent, not be joined into static geometry.
  key=(o.parent.name,o.data.materials[0].name)
  groups.setdefault(key,[]).append(o)
 for (parent,mat),objs in groups.items():
  bpy.ops.object.select_all(action='DESELECT')
  for o in objs:o.select_set(True)
  bpy.context.view_layer.objects.active=objs[0]
  if len(objs)>1:bpy.ops.object.join()
  bpy.context.object.name=asset+'_'+re.sub(r'[^a-zA-Z0-9_]+','_',mat)+'_'+parent
 bpy.ops.export_scene.gltf(filepath=str(runtime),export_format='GLB',export_extras=True,export_cameras=False,export_lights=False)
 meshes=[o for o in bpy.data.objects if o.type=='MESH']
 receipt={'asset':asset,'status':'architecture proof candidate; not Garden visual approval or application integration','source':str(source.relative_to(ROOT)),'runtime':str(runtime.relative_to(ROOT)),'sourceParts':sourceparts,'runtimeMeshes':len(meshes),'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in meshes),'glbBytes':runtime.stat().st_size,'materials':len(materials),'packedImages':len([i for i in bpy.data.images if i.packed_file]),'worldXZ':[root['locked_x'],root['locked_z']],'handles':list(handles),'externalAssets':'None; procedural textures and authored geometry. Sleeve artwork is read from existing local catalog by QA viewer.'}
 (QA/f'{asset}-build-receipt.json').write_text(json.dumps(receipt,indent=2)+'\n');print(json.dumps(receipt))
