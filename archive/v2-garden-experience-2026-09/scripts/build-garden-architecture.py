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
 bs=m.node_tree.nodes.get('Principled BSDF')
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

fresh();P=palette();root=empty('stall_root')
for x in [-2.34,2.34]:
 for z in [-1.33,1.33]:
  box('Stone post footing',[x,.07,z],[.28,.14,.28],P['stone'],.025)
  box('Slender timber post',[x,1.44,z],[.115,2.8,.115],P['wood'])
  for dx in [-.038,.038]:cylinder('Post bolt',[x+dx,.35,z+.065],.013,.013,P['metal'],n=12).rotation_euler.x=math.pi/2
  beam('Knee brace',[x,2.25,z],[x-math.copysign(.40,x),2.78,z],.065,P['dark'])
for z in [-1.33,1.33]:beam('Long canopy rail',[-2.44,2.80,z],[2.44,2.80,z],.10,P['wood'])
for x in [-2.34,2.34]:
 beam('Canopy side rail',[x,2.82,-1.47],[x,2.82,1.47],.075,P['wood'])
 beam('Canopy ridge support',[x,2.80,-1.33],[x,3.12,0],.075,P['wood']);beam('Canopy ridge support',[x,3.12,0],[x,2.80,1.33],.075,P['wood'])
beam('Canopy ridge',[-2.46,3.12,0],[2.46,3.12,0],.065,P['wood'])
def canopy_y(x,z):return 3.17-.23*abs(z)/1.60-.09*math.sin(math.pi*(x+2.65)/5.3)**2+.012*math.sin(x*16+z*2)
verts=[];uv=[];faces=[];nx,nz=64,24
for j in range(nz+1):
 z=-1.60+j*3.20/nz
 for i in range(nx+1):
  x=-2.65+i*5.3/nx;verts.append([x,canopy_y(x,z),z]);uv.append([i/nx*5,j/nz*3])
for j in range(nz):
 for i in range(nx):
  a=j*(nx+1)+i;faces.append((a,a+nx+1,a+nx+2,a+1))
o=mesh('Tailored canvas canopy',verts,faces,P['canvas'],uv)
for f in o.data.polygons:f.use_smooth=True
for z in [-1.60,1.60]:
 v=[];fs=[]
 for i in range(65):
  x=-2.65+i*5.3/64;y=canopy_y(x,z);v.extend([[x,y,z],[x,y-.115,z]])
 for i in range(64):fs.append((2*i,2*i+1,2*i+3,2*i+2))
 mesh('Canvas straight stitched valance',v,fs,P['canvas'])
for x in [-1.77,-.88,0,.88,1.77]:
 for j in range(12):
  z=-1.6+j*3.2/12;beam('Raised canvas seam',[x,canopy_y(x,z)+.006,z],[x,canopy_y(x,z+3.2/12)+.006,z+3.2/12],.007,P['paper'])
# Open slatted counter, storage shelves and six curated record sleeves.
for x in [-2.10,-.4,2.10]:
 for z in [.38,1.16]:box('Counter leg',[x,.55,z],[.075,1.0,.075],P['dark'])
for j in range(4):box('Counter board',[0,1.075,.36+j*.27],[4.45,.065,.25],P['wood'])
for y in [.28,.69]:
 for j in range(3):box('Under-counter shelf',[0,y,.43+j*.27],[4.3,.045,.25],P['wood'])
for x in [-1.85,-1.07,-.29]:
 for xx in [x-.33,x+.33]:box('Record bin side',[xx,1.21,.72],[.025,.27,.62],P['wood'])
 for z in [.42,1.02]:box('Record bin rail',[x,1.17,z],[.69,.10,.035],P['wood'])
 for k in range(5):box('Stored record edge',[x,1.23,.49+k*.085],[.59,.23,.018],P['paper'])
for i in range(6):
 x=-1.85+(i%3)*.78;z=.56+(i//3)*.28
 sleeve=box('sleeve_%02d'%(i+1),[x,1.41,z],[.62,.62,.018],P['paper'],.005)
 sleeve['slot']=i;sleeve['artwork']='bound to existing catalog cover in QA runtime';sleeve.rotation_euler.x=math.radians(-13)
# New physical deck: pivot origins match platter spindle and tonearm bearing.
tt=empty('turntable_root',(1.12,1.11,.73),root)
for o in [box('Walnut turntable plinth',[1.12,1.18,.73],[1.01,.14,.70],P['wood'],.04),box('Turntable top plate',[1.12,1.255,.73],[.94,.014,.64],P['metal'],.02)]:parent_keep(o,tt)
for x in [.76,1.48]:
 for z in [.48,.98]:parent_keep(cylinder('Isolation foot',[x,1.11,z],.065,.09,P['black']),tt)
platter=empty('platter_pivot',(-.14,.16,0),tt)
for name,y,r,h,mat in [('platter',1.295,.275,.038,P['metal']),('vinyl',1.319,.263,.008,P['black']),('label',1.325,.077,.003,P['paper']),('spindle',1.335,.009,.04,P['brass'])]:
 o=cylinder(name,[.98,y,.73],r,h,mat,n=64);parent_keep(o,platter)
for r in [.12,.17,.22,.253]:
 bpy.ops.mesh.primitive_torus_add(major_radius=r,minor_radius=.0009,major_segments=64,minor_segments=6,location=xyz([.98,1.324,.73]));parent_keep(remember(bpy.context.object,'Record groove',P['metal']),platter)
tone=empty('tonearm_pivot',(.33,.19,-.22),tt)
for o in [cylinder('Tonearm bearing',[1.45,1.31,.51],.036,.10,P['brass']),beam('Tonearm shaft',[1.45,1.35,.51],[1.37,1.35,.91],.018,P['metal']),box('Cartridge',[1.33,1.342,.935],[.052,.026,.08],P['black'])]:parent_keep(o,tone)
# Restrained practical at the locked lamp height, unlit in this day proof.
beam('Lamp cord',[.65,3.09,.05],[.65,2.69,.05],.009,P['metal'])
cylinder('Lamp shade',[.65,2.63,.05],.14,.12,P['dark'],r2=.045,n=32)
cylinder('Lamp diffuser',[.65,2.575,.05],.095,.008,P['paper'])
# Small side stool, no decorative signage or random props.
for x in [1.77,2.13]:
 for z in [-.87,-.51]:beam('Stool leg',[x,.10,z],[x,.66,z],.045,P['wood'])
box('Stool seat',[1.95,.70,-.69],[.54,.07,.54],P['wood'],.025)
export_asset('stall',root,('stall_root','turntable_root','platter_pivot','tonearm_pivot','vinyl','label',*[f'sleeve_{i:02d}' for i in range(1,7)]))

fresh();P=palette();root=empty('greenhouse_root')
# 5.6 x 4.1 m greenhouse. Gable is quiet, frame slender, panes visibly layered.
box('Low masonry foundation',[0,.14,0],[5.70,.28,4.20],P['stone'],.035)
for x in [-2.76,2.76]:box('Brick upstand',[x,.32,0],[.14,.30,4.10],P['stone'])
box('Rear brick upstand',[0,.32,-2.0],[5.52,.30,.14],P['stone'])
for x,w in [(-1.75,2.02),(1.75,2.02)]:box('Front brick upstand',[x,.32,2.0],[w,.30,.14],P['stone'])
for x in [-2.78,2.78]:
 for z in [-2.04,-1.02,0,1.02,2.04]:box('Side mullion',[x,1.43,z],[.048,2.34,.048],P['dark'],.004)
 for y in [.45,1.50,2.57]:beam('Side glazing rail',[x,y,-2.08],[x,y,2.08],.044,P['dark'])
for z in [-2.04,2.04]:
 for x in [-2.78,-1.85,-.78,.78,1.85,2.78]:box('End mullion',[x,1.43,z],[.048,2.34,.048],P['dark'],.004)
 for y in [.45,1.50,2.57]:
  if z>0 and y<2.57:
   for a,b in [(-2.78,-.78),(.78,2.78)]:beam('Front glazing rail',[a,y,z],[b,y,z],.044,P['dark'])
  else:beam('End glazing rail',[-2.78,y,z],[2.78,y,z],.044,P['dark'])
for z in [-2.04,-1.02,0,1.02,2.04]:
 for s in [-1,1]:beam('Roof rafter',[s*2.82,2.59,z],[0,3.49,z],.055,P['dark'])
beam('Roof ridge',[0,3.49,-2.12],[0,3.49,2.12],.065,P['dark'])
for x in [-1.39,1.39]:beam('Roof intermediate glazing bar',[x,3.04,-2.08],[x,3.04,2.08],.035,P['dark'])
# Distinct panes retained in source; batch by material only at export.
idx=0
def pane(name,v):
 global idx
 idx+=1;return mesh(name,v,[(0,1,2,3)],P['glassvar'] if idx%7==0 else P['glass'])
for x in [-2.775,2.775]:
 for z in [-2.04,-1.02,0,1.02]:
  for lo,hi in [(.47,1.48),(1.52,2.55)]:pane('Side individual glass',[[x,lo,z+.025],[x,lo,z+.995],[x,hi,z+.995],[x,hi,z+.025]])
for z in [-2.035,2.035]:
 xs=[-2.78,-1.85,-.78,.78,1.85,2.78]
 for a,b in zip(xs,xs[1:]):
  if z>0 and a==-.78:continue
  for lo,hi in [(.47,1.48),(1.52,2.55)]:pane('End individual glass',[[a+.025,lo,z],[b-.025,lo,z],[b-.025,hi,z],[a+.025,hi,z]])
 for a,b in [(-2.76,0),(0,2.76)]:
  verts=[[a,2.59,z],[b,2.59,z],[0,3.46,z]];mesh('Gable glass',verts,[(0,1,2)],P['glass'])
for s in [-1,1]:
 for z in [-2.04,-1.02,0,1.02]:
  for a,b in [(.025,1.36),(1.42,2.78)]:pane('Individual roof glass',[[s*a,3.49-a*.90/2.82,z+.024],[s*b,3.49-b*.90/2.82,z+.024],[s*b,3.49-b*.90/2.82,z+.995],[s*a,3.49-a*.90/2.82,z+.995]])
# Partly opened narrow door adds depth without filling the view with reflection.
door=empty('greenhouse_door_pivot',(-.76,.30,2.055),root)
doorparts=[]
for x in [-.74,.67]:doorparts.append(box('Door stile',[x,1.42,2.07],[.045,2.23,.055],P['dark']))
for y in [.34,1.5,2.52]:doorparts.append(box('Door rail',[-.035,y,2.07],[1.46,.045,.055],P['dark']))
for lo,hi in [(.37,1.47),(1.53,2.49)]:doorparts.append(pane('Door glass',[[-.71,lo,2.072],[.64,lo,2.072],[.64,hi,2.072],[-.71,hi,2.072]]))
doorparts.append(beam('Door handle',[.57,1.23,2.13],[.57,1.43,2.13],.024,P['brass']))
for o in doorparts:parent_keep(o,door)
door.rotation_euler.z=math.radians(-24)
# Slatted interior benches are offset, keeping a readable central aisle.
for x in [-2.17,2.17]:
 for z in [-1.6,1.3]:
  for dx in [-.29,.29]:box('Bench leg',[x+dx,.58,z],[.06,1.04,.06],P['dark'])
 for dx in [-.27,-.09,.09,.27]:box('Potting bench slat',[x+dx,1.12,-.12],[.16,.065,3.36],P['wood'])
for x,z,s,seed in [(-2.17,-1.40,.8,1),(-2.17,-.55,.65,2),(-2.17,.30,1,3),(-2.17,1.15,.6,4),(2.17,-1.28,1,5),(2.17,-.3,.68,6),(2.17,.76,.85,7)]:potted_plant(x,1.16,z,s,seed)
for x,z,s,seed in [(-1.60,-1.3,1.40,8),(1.65,-1.5,1.4,9),(-2.08,.93,.86,10)]:potted_plant(x,.29,z,s,seed)
for j in range(4):box('Potting tray plank',[1.82+j*.12,1.19,1.36],[.10,.035,.42],P['wood'])
for x in [1.8,2.22]:box('Potting tray edge',[x,1.24,1.36],[.025,.12,.46],P['wood'])
export_asset('greenhouse',root,('greenhouse_root','greenhouse_door_pivot'))
