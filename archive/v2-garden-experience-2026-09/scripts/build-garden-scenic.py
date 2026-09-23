"""Garden house refinement + landscaped setting. New sources; old milestones untouched."""
import sys,math,json,random
from pathlib import Path
from mathutils import Vector,Matrix
sys.path.insert(0,str(Path(__file__).resolve().parent))
import garden_authoring as A
import bpy
ROOT=Path(__file__).resolve().parents[1];SRC=ROOT/'source/garden/production';OUT=ROOT/'assets/garden/production';QA=ROOT/'docs/qa/garden-scenic-2026-09-13'
STUDY=A.STUDY;xyz=A.xyz
rng=random.Random(130913)

def save_export(name):
 bpy.context.preferences.filepaths.save_version=0
 bpy.context.scene['status']='Scenic development candidate; not approved final Garden'
 bpy.context.scene['source_reference']='User art direction board and feedback: more layered greenery, more house character'
 source=SRC/(name+'.blend');runtime=OUT/(name+'.glb')
 bpy.ops.wm.save_as_mainfile(filepath=str(source))
 meshes=[o for o in bpy.context.scene.objects if o.type=='MESH'];sourceParts=len(meshes)
 groups={}
 for o in meshes:
  key=(o.parent.name if o.parent else '',tuple(m.name for m in o.data.materials))
  groups.setdefault(key,[]).append(o)
 for (parent,mats),objs in groups.items():
  bpy.ops.object.select_all(action='DESELECT')
  for o in objs:o.select_set(True)
  bpy.context.view_layer.objects.active=objs[0]
  if len(objs)>1:bpy.ops.object.join()
  bpy.context.object.name=(name+'_'+(mats[0] if mats else 'surface')).replace(' ','_')
 bpy.ops.export_scene.gltf(filepath=str(runtime),export_format='GLB',export_extras=True,export_cameras=False,export_lights=False,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6,export_draco_position_quantization=16,export_draco_normal_quantization=10,export_draco_texcoord_quantization=14,export_draco_color_quantization=10)
 meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
 data={'asset':name,'source':str(source.relative_to(ROOT)),'runtime':str(runtime.relative_to(ROOT)),'sourceParts':sourceParts,'runtimeMeshes':len(meshes),'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in meshes),'glbBytes':runtime.stat().st_size,'status':'scenic WIP; visual review pending'}
 (QA/(name+'-receipt.json')).write_text(json.dumps(data,indent=2)+'\n');print(json.dumps(data))

# Adapt the editable baseline locally. No rewrite of its original source or export.
bpy.ops.wm.open_mainfile(filepath=str(SRC/'garden-house.blend'))
root=bpy.data.objects['garden_house_root'];bpy.context.view_layer.update()
A.parts=[];A.materials={};P=A.palette();A.P=P
rootinv=root.matrix_world.inverted()
# Broaden body modestly; raise eaves, retaining the locked top-height intent.
def refined_z(z):
 if z<=2.75:return z
 if z<=3.2:return z+.65*(z-2.75)/.45
 return 3.85+(z-3.2)*(6.2-3.85)/(6.2-3.2)
tinted=set()
for o in list(root.children):
 if o.type!='MESH':continue
 if o.name.startswith('Side wall'):
  bpy.data.objects.remove(o,do_unlink=True);continue
 local=rootinv@o.matrix_world
 for v in o.data.vertices:
  p=local@v.co;p.x*=1.13;p.z=refined_z(p.z);v.co=p
 o.matrix_basis=Matrix.Identity(4)
 # Subdued roof color and shared matte timber family.
 for i,m in enumerate(o.data.materials):
  if m.name=='Porch timber':o.data.materials[i]=P['wood']
  if m.name=='Weathered dark moss timber':o.data.materials[i]=P['dark']
  if m.name.startswith('Clay tile variation') and m.name not in tinted:
   tinted.add(m.name)
   bs=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');c=bs.inputs['Base Color'].default_value;bs.inputs['Base Color'].default_value=(c[0]*.80,c[1]*.88,c[2]*.94,1)
plaster=bpy.data.materials['Warm lime plaster'];stone=bpy.data.materials['Limestone plinth']
def texture_surface(mat,name):
 bs=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
 for suffix,socket in [('', 'Base Color'),('-normal','Normal')]:
  im=bpy.data.images.load(str(SRC/'textures'/(name+suffix+'.png')),check_existing=True);im.pack()
  tex=mat.node_tree.nodes.new('ShaderNodeTexImage');tex.image=im
  if suffix:
   im.colorspace_settings.name='Non-Color';normal=mat.node_tree.nodes.new('ShaderNodeNormalMap');normal.inputs['Strength'].default_value=.24
   mat.node_tree.links.new(tex.outputs['Color'],normal.inputs['Color']);mat.node_tree.links.new(normal.outputs['Normal'],bs.inputs[socket])
  else:mat.node_tree.links.new(tex.outputs['Color'],bs.inputs[socket])
texture_surface(plaster,'limewash')

# Genuine side-wall openings. Near side is visible from Arrival, previously blank.
for side in [-1,1]:
 x=side*3.85
 for za,zb in [(-2.5,-1.95),(-.65,.35),(1.65,2.5)]:A.box('Side plaster pier',[x,2.025,(za+zb)/2],[.2,3.65,zb-za],plaster)
 for zc in [-1.3,1.0]:
  A.box('Side parapet',[x,.65,zc],[.2,.90,1.30],plaster)
  A.box('Side lintel',[x,3.1,zc],[.2,1.5,1.30],plaster)
  A.box('Recess dark frame',[x+side*.02,1.74,zc],[.15,1.40,1.30],P['dark'])
  A.box('Recess blue glass',[x+side*.105,1.74,zc],[.02,1.24,1.14],bpy.data.materials['Quiet blue green window glass'])
  for y in [1.06,1.74,2.42]:A.box('Side window horizontal rail',[x+side*.14,y,zc],[.11,.055,1.39],P['dark'])
  for z in [zc-.65,zc,zc+.65]:A.box('Side window mullion',[x+side*.14,1.74,z],[.11,1.4,.05],P['dark'])
  A.box('Side stone sill',[x+side*.16,1.0,zc],[.38,.10,1.55],stone,.025)
  for k in range(5):A.box('Side upper louvre',[x+side*.16,2.56+k*.12,zc],[.08,.075,1.35],P['wood'])
 # rainwater pipe and dark eave line
 A.beam('Rainwater downpipe',[x+side*.13,3.82,-2.34],[x+side*.13,.26,-2.34],.075,P['dark'])
 A.beam('Rain gutter',[x+side*.32,3.78,-2.90],[x+side*.32,3.78,2.90],.12,P['dark'])
# Quoin/base courses vary in scale rather than a perfect repeated brick decal.
for side in [-1,1]:
 for k in range(9):
  z=-2.25+k*.56;A.box('Limestone base course',[side*3.96,.28,z],[.18,.27,.52],stone,.025)
# Porch bench, wall light, plant pots and a small timber screen add lived-in use.
for x in [1.05,2.75]:
 for z in [2.85,3.25]:A.box('Porch bench leg',[x,.47,z],[.06,.5,.06],P['wood'])
for z in [2.84,3.00,3.16,3.32]:A.box('Porch bench seat',[1.9,.73,z],[2.0,.065,.14],P['wood'])
for y in [.94,1.10]:A.box('Porch bench backrest',[1.9,y,2.74],[2,.105,.075],P['wood'])
A.box('Wall lantern bracket',[-3.15,2.08,2.64],[.1,.36,.09],P['dark'])
A.box('Wall lantern glass',[-3.15,2.06,2.78],[.18,.25,.18],P['paper'])
for y in [1.90,2.22]:A.box('Wall lantern cap',[-3.15,y,2.78],[.25,.045,.24],P['dark'])
A.potted_plant(-3.05,.25,3.16,.9,74);A.potted_plant(3.4,.25,3.15,1.15,75)
# L-shaped veranda: connect the existing +x reception porch to a +z-facing living side.
# Local -x faces world +z after house root rotation; all geometry remains house-relative.
for i in range(27):
 xx=-4.30+i*.325
 A.box('Reception porch extension plank',[xx,.20,4.16],[.305,.13,.80],P['wood'])
for i in range(23):
 zz=-2.5+i*.31
 A.box('Lakeside veranda plank',[-4.99,.20,zz],[2.10,.13,.29],P['wood'])
for zz in [-2.50,.80,4.32]:
 A.box('Veranda stone pad',[-5.90,.05,zz],[.32,.25,.32],stone,.025)
 A.box('Veranda slender post',[-5.90,1.59,zz],[.12,2.7,.12],P['dark'])
 A.beam('Veranda knee bracket',[-5.90,2.40,zz],[-5.45,2.97,zz],.07,P['wood'])
A.beam('Veranda outer header',[-5.90,2.97,-2.75],[-5.90,2.97,4.55],.14,P['dark'])
canopyMat=A.material('Veranda aged standing seam',(.17,.205,.16),.84)
for i in range(23):
 z0=-2.80+i*.325;z1=z0+.315
 A.mesh('Veranda roof panel',[[-3.82,3.60,z0],[-6.12,3.04,z0],[-6.12,3.04,z1],[-3.82,3.60,z1]],[(0,1,2,3)],canopyMat)
 A.beam('Veranda raised seam',[-3.82,3.615,z0],[-6.12,3.055,z0],.018,P['dark'])
for zz in [-2.75,4.55]:A.beam('Veranda side fascia',[-3.82,3.58,zz],[-6.12,3.02,zz],.11,P['dark'])
# A sitting bench faces the water, with circulation left outside it.
for zz in [-1.1,.25]:
 for xx in [-4.45,-4.08]:A.box('Lake bench leg',[xx,.45,zz],[.06,.44,.06],P['wood'])
for xx in [-4.46,-4.29,-4.12]:A.box('Lake bench seat',[xx,.70,-.43],[.15,.07,1.68],P['wood'])
for yy in [.9,1.08]:A.box('Lake bench back',[-3.98,yy,-.43],[.075,.13,1.68],P['wood'])
for i in range(3):A.box('Veranda garden step',[-6.08-i*.28,.15-i*.12,.55],[.38,.17,1.35],stone,.025)

for o in A.parts:o.parent=root
root['status']='Scenic house revision; raised eaves, softened roof dominance, side openings, porch life; not approved'
save_export('garden-house-scenic')

# Landscape: terrain and handcrafted vegetation, anchored around existing architecture.
A.fresh();P=A.palette();A.P=P
meadow=A.material('Meadow base',(.19,.255,.105),1)
earth=A.material('Walked fine gravel',(.39,.34,.245),1)
water=A.material('Quiet secondary water',(.22,.35,.36),.18,.18)
stoneM=[A.material('Path limestone '+str(i),c) for i,c in enumerate([(.43,.445,.37),(.51,.51,.43),(.37,.39,.32)])]
leafM=[A.material('Canopy leaf '+str(i),c) for i,c in enumerate([(.095,.18,.06),(.16,.26,.08),(.235,.32,.11),(.105,.225,.09),(.285,.34,.13)])]
bark=A.material('Textured bark',(.16,.135,.09),.97)
texture_surface(bark,'bark')
grassM=[A.material('Meadow grass '+str(i),c) for i,c in enumerate([(.19,.28,.095),(.32,.36,.14),(.125,.215,.065)])]
def smooth(a,b,t):
 t=max(0,min(1,(t-a)/(b-a)));return t*t*(3-2*t)
PORCH_LEVEL=STUDY['envelopes']['house']['position'][1]+.265
WATER_LEVEL=PORCH_LEVEL-.65
LAKE_CONTROL=[(-72,-2),(-36,-3),(-25,0),(-20,3),(-17,6),(-16.5,10),(-17.4,16),(-20,24),(-24,32),(-26,45),(-72,45)]
LAKE_POLYGON=LAKE_CONTROL[:]
for _ in range(2):
 points=[]
 for a,b in zip(LAKE_POLYGON,LAKE_POLYGON[1:]+LAKE_POLYGON[:1]):points.extend([(a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25),(a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75)])
 LAKE_POLYGON=points
def water_distance(x,z):
 inside=False;distance=999
 for a,b in zip(LAKE_POLYGON,LAKE_POLYGON[1:]+LAKE_POLYGON[:1]):
  ax,az=a;bx,bz=b
  if (az>z)!=(bz>z) and x<(bx-ax)*(z-az)/(bz-az)+ax:inside=not inside
  dx,dz=bx-ax,bz-az;t=max(0,min(1,((x-ax)*dx+(z-az)*dz)/(dx*dx+dz*dz)))
  distance=min(distance,math.hypot(x-ax-t*dx,z-az-t*dz))
 return -distance if inside else distance
def height(x,z):
 h=-2.5+2.5*smooth(2,28,z)
 h+=6.8*math.exp(-((z+59)/13)**2)*(.63+.23*math.sin(x*.105)+.22*math.cos(x*.19))
 h+=7.0*math.exp(-((x+54)/22)**2-((z-57)/13)**2)*(1+.2*math.sin(x*.16))
 h+=.24*math.sin(x*.18)*math.cos(z*.14)*(1-smooth(-25,0,z))
 for name,item in STUDY['envelopes'].items():
  px,py,pz=item['position'];w,_,d=item['size']
  if name=='house':w,d=7.4,8.7
  distance=max(abs(x-px)-w/2,abs(z-pz)-d/2,0)
  weight=1-smooth(.65,3.8,distance);h=h*(1-weight)+py*weight
 # Lakebed and a continuous low bank. Land falls away from veranda.
 d=water_distance(x,z)
 if d<0:h=WATER_LEVEL-.34-min(.35,-d*.06)
 elif d<4:
  weight=1-smooth(0,4,d);bank=WATER_LEVEL+.04+.12*smooth(0,1.6,d)
  h=h*(1-weight)+bank*weight
 return h
# Dense enough smooth terrain, bounded hills and per-vertex earthy variation.
verts=[];faces=[];nx,nz=152,176
for j in range(nz+1):
 z=-88+j*176/nz
 for i in range(nx+1):
  x=-88+i*152/nx;verts.append([x,height(x,z),z])
for j in range(nz):
 for i in range(nx):
  a=j*(nx+1)+i;faces.append((a,a+nx+1,a+nx+2,a+1))
terrain=A.mesh('Sculpted garden terrain',verts,faces,meadow,[(v[0]*.26,v[2]*.26) for v in verts])
attr=terrain.data.color_attributes.new(name='GardenTint',type='FLOAT_COLOR',domain='POINT')
for i,(x,y,z) in enumerate(verts):
 n=.5+.22*math.sin(x*.24+z*.18)+.14*math.sin(x*.73-z*.45)
 attr.data[i].color=(.16+n*.09,.225+n*.10,.07+n*.065,1)
for p in terrain.data.polygons:p.use_smooth=True
# Vertex color multiplication is native glTF; keep material base neutral.
bs=next(n for n in meadow.node_tree.nodes if n.type=='BSDF_PRINCIPLED');bs.inputs['Base Color'].default_value=(1,1,1,1)
texture_surface(meadow,'ground-grain')
vc=meadow.node_tree.nodes.new('ShaderNodeVertexColor');vc.layer_name='GardenTint'
meadow.node_tree.links.new(vc.outputs['Color'],bs.inputs['Base Color'])
terrain['status']='Landscape development; architecture footings and open yard preserved'
# Path centrelines: curve along yard edge, branching behind the open yard.
paths=[([(7,22),(3,14),(-4,14),(-8,8),(-8,-4.3),(-9.5,-4.3)],1.5),([(-8,0),(-1,-1),(8,-1),(16.5,-1),(16.5,-2.3)],1.1),([(-1,-1),(-1,-7.7)],.8),([(-1,-7.2),(4,-8),(8,-10.95)],.8),([(-14,.8),(-16,2.8),(-18.4,3.8)],.85)]
segments=[]
for pathid,(points,width) in enumerate(paths):
 centers=[]
 for a,b in zip(points,points[1:]):
  length=math.dist(a,b);steps=max(2,int(length*2))
  for i in range(steps):
   t=i/steps;centers.append((a[0]*(1-t)+b[0]*t,a[1]*(1-t)+b[1]*t))
  segments.append((a,b,width))
 centers.append(points[-1]);v=[];f=[]
 for i,(x,z) in enumerate(centers):
  a=centers[max(0,i-1)];b=centers[min(len(centers)-1,i+1)];dx,dz=b[0]-a[0],b[1]-a[1];L=math.hypot(dx,dz);w=width/2*(1+.13*math.sin(i*2.4))
  for s in [-1,1]:
   xx=x+s*(-dz)/L*w;zz=z+s*dx/L*w;v.append([xx,height(xx,zz)+.035,zz])
  if i:f.append((2*i-2,2*i,2*i+1,2*i-1))
 A.mesh('Gravel path '+str(pathid),v,f,earth)
 # Broad imperfect stepping stones, interrupted by gravel gaps.
 for i in range(1,len(centers)-1,3):
  x,z=centers[i];x+=rng.uniform(-.16,.16);z+=rng.uniform(-.15,.15)
  ring=[];N=7;y=height(x,z)+.065
  for k in range(N):
   a=k*math.tau/N;r=rng.uniform(.82,1.12);ring.append([x+math.cos(a)*width*.34*r,y+rng.uniform(-.014,.014),z+math.sin(a)*.40*r])
  vs=ring+[[p[0],p[1]-.08,p[2]] for p in ring];fs=[tuple(range(N-1,-1,-1))]
  for k in range(N):fs.append((k,(k+1)%N,(k+1)%N+N,k+N))
  A.mesh('Hand laid limestone',vs,fs,rng.choice(stoneM))
# Continuous lake fragment, entering from beyond the left/foreground frame.
waterObj=A.mesh('Secondary lakeshore surface',[[x,WATER_LEVEL,z] for x,z in LAKE_POLYGON],[tuple(range(len(LAKE_POLYGON)-1,-1,-1))],water,[(x*.075,z*.075) for x,z in LAKE_POLYGON])
wb=next(n for n in water.node_tree.nodes if n.type=='BSDF_PRINCIPLED')
wi=bpy.data.images.load(str(SRC/'textures/water-ripple-normal.png'),check_existing=True);wi.colorspace_settings.name='Non-Color';wi.pack()
wt=water.node_tree.nodes.new('ShaderNodeTexImage');wt.image=wi
wn=water.node_tree.nodes.new('ShaderNodeNormalMap');wn.inputs['Strength'].default_value=.22
water.node_tree.links.new(wt.outputs['Color'],wn.inputs['Color']);water.node_tree.links.new(wn.outputs['Normal'],wb.inputs['Normal'])
waterObj['water_level']=WATER_LEVEL;waterObj['anchor_x']=-18;waterObj['anchor_z']=8
for (ax,az),(bx,bz) in zip(LAKE_POLYGON,LAKE_POLYGON[1:]+LAKE_POLYGON[:1]):
 if not(-29<ax<-15 and 0<az<32) or rng.random()<.48:continue
 for j in range(max(1,int(math.hypot(bx-ax,bz-az)*1.2))):
  t=rng.random();x=ax+(bx-ax)*t+.25;z=az+(bz-az)*t
  bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2,radius=1,location=xyz([x,height(x,z)+.04,z]));o=bpy.context.object;o.name='Water bank stone';o.scale=(rng.uniform(.18,.45),rng.uniform(.13,.33),rng.uniform(.09,.18));o.data.materials.append(rng.choice(stoneM));A.parts.append(o)
# Simple inhabited workspace instead of an opaque diagnostic cube.
x,y,z=STUDY['envelopes']['workspace']['position']
for dx in [-1.8,1.8]:
 for dz in [-.9,.9]:A.box('Workspace pergola post',[x+dx,y+1.4,z+dz],[.10,2.8,.10],P['wood'])
for dz in [-1,1]:A.beam('Workspace pergola rail',[x-2,y+2.8,z+dz],[x+2,y+2.8,z+dz],.12,P['dark'])
for i in range(13):A.box('Workspace pergola slat',[x-1.98+i*.33,y+2.85,z],[.075,.08,2.25],P['wood'])
for dx in [-1.35,1.35]:
 for dz in [-.4,.4]:A.box('Working table leg',[x+dx,y+.47,z+dz],[.065,.94,.065],P['dark'])
A.box('Working table',[x,y+.98,z],[3.1,.07,1.04],P['wood'])
A.box('Sketchbook',[x-.75,y+1.03,z+.08],[.42,.025,.30],P['paper']);A.box('Model base',[x+.4,y+1.04,z],[.48,.035,.37],stoneM[1]);A.potted_plant(x+1.05,y+1.02,z-.08,.40,27)
# Low garden display deck at the existing Shows anchor (not a new destination).
sx,sz=12,6;sy=height(sx,sz)
for j in range(17):A.box('Garden display deck plank',[sx-2.85+j*.355,sy+.57,sz],[.335,.06,3.0],P['wood'])
for dx in [-2.7,0,2.7]:
 for dz in [-1.25,1.25]:A.box('Display deck support',[sx+dx,sy+.27,sz+dz],[.10,.54,.10],P['dark'])
# No tall front-facing wall: the Garden view remains landscape-led.
# Woody branched plants. Leaves are curved geometry, not stock tree spheres.
leafBatches={i:([],[]) for i in range(len(leafM))};grassBatches={i:([],[]) for i in range(3)}
def leaf(center,direction,length,width,batch,rand,steps=4):
 vs,fs=batch;c=Vector(center);d=Vector(direction).normalized();side=d.cross(Vector([0,1,0]))
 if side.length<.01:side=Vector([1,0,0])
 side.normalize();side*=width
 # Random tilt keeps dense leaf masses volumetric across camera directions.
 side=Matrix.Rotation(rand.uniform(-1,1),3,d)@side
 k=len(vs)
 for j in range(steps+1):
  t=j/steps;w=math.sin(math.pi*t)**.8
  mid=c+d*length*t+Vector([0,.045*math.sin(math.pi*t)-.045*t*t,0])
  vs.extend([list(mid+side*w),list(mid-side*w)])
 for j in range(steps):
  a=k+j*2;fs.extend([(a,a+1,a+3),(a,a+3,a+2)])

def tapered(name,a,b,r1,r2,mat):
 av,bv=Vector(xyz(a)),Vector(xyz(b));bpy.ops.mesh.primitive_cone_add(vertices=7,radius1=r1,radius2=r2,depth=(bv-av).length,location=(av+bv)/2)
 o=bpy.context.object;o.name=name;o.rotation_euler=(bv-av).to_track_quat('Z','Y').to_euler();o.data.materials.append(mat)
 for p in o.data.polygons:p.use_smooth=True
 A.parts.append(o)
def tree(x,z,H,seed,shrub=False):
 rand=random.Random(seed);ground=height(x,z);base=Vector([x,ground,z]);trunk=Vector([x+.23*math.sin(seed),ground+H*.63,z+.25*math.cos(seed)])
 tapered('Shrub stem' if shrub else 'Garden tree trunk',base,trunk,H*.045 if not shrub else .025,H*.012,bark)
 branchCount=7 if shrub else rand.randint(8,11)
 for j in range(branchCount):
  a=j*2.399+rand.uniform(-.5,.5);dist=H*rand.uniform(.19,.34);level=H*rand.uniform(.22,.68) if shrub else H*rand.uniform(.66,.91)
  tip=Vector([x+math.cos(a)*dist,ground+level,z+math.sin(a)*dist]);start=base.lerp(trunk,rand.uniform(.15,.65) if shrub else rand.uniform(.35,.92))
  bend=start.lerp(tip,.48)+Vector([.14*math.sin(a),H*.07,.17*math.cos(a)])
  tapered('Tree branch base',start,bend,H*.014 if not shrub else .018,H*.008 if not shrub else .010,bark)
  tapered('Tree branch tip',bend,tip,H*.008 if not shrub else .010,.012 if not shrub else .006,bark)
  for k in range(3):
   aa=a+(k-1)*.95;twig=tip+Vector([math.cos(aa)*H*.12,H*.08,math.sin(aa)*H*.12]);tapered('Foliage twig',tip,twig,.015 if not shrub else .008,.003,bark)
   count=52 if not shrub else 40
   for n in range(count):
    theta=rand.random()*math.tau;u=rand.uniform(-1,1);rad=(rand.random()**(1/3))*H*(.095 if not shrub else .26)
    center=twig+Vector([rad*math.sqrt(1-u*u)*math.cos(theta),u*rad*.68,rad*math.sqrt(1-u*u)*math.sin(theta)])
    d=[math.cos(theta),rand.uniform(-.35,.55),math.sin(theta)]
    leaf(center,d,rand.uniform(.23,.39) if not shrub else rand.uniform(.11,.21),rand.uniform(.065,.13) if not shrub else rand.uniform(.035,.075),leafBatches[rand.randrange(len(leafM))],rand)
# Distinct near, middle and distant layers. No trunk in the locked open yard.
trees=[(-23,-9,9.3,1),(-18,-19,8.4,2),(-10,-23,7.5,3),(7,-25,8.9,4),(19,-21,8.4,5),(26,-7,9.4,6),(-29,-5,8.3,7),(25,9,8.7,8),(2,19,9.5,9),(-30,-29,9.6,10),(29,-32,8.8,11),(-6,-35,8.6,12),(20,-40,9.8,13),(-48,49,8.4,21),(-36,47,9.1,22),(-29,48,8.1,23),(-62,46,8.5,24),(-77,22,9,25)]
for t in trees:tree(*t)
shrubs=[(-18,-2,1.7),(-20.5,-2,1.2),(-20,-5,2.0),(-9,-8,1.6),(-10,-12,1.8),(4,-16,1.9),(12,-16,1.6),(12,-10,1.3),(21,-5,2.0),(20,-9,1.7),(21,0,1.3),(-11.5,4,.6),(-24,-5,1.5),(11,15,.55),(-5,18,.65)]
for i,(x,z,H) in enumerate(shrubs):tree(x,z,H,100+i,True)
# Ground planting occurs in irregular patches; open yard is kept low and clear.
def path_distance(x,z):
 dist=999
 for a,b,w in segments:
  dx,dz=b[0]-a[0],b[1]-a[1];t=max(0,min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz)))
  dist=min(dist,math.hypot(x-a[0]-t*dx,z-a[1]-t*dz)-w*.5)
 return dist
def can_plant(x,z):
 if -6<x<8 and 2<z<12:return False
 if path_distance(x,z)<.32:return False
 if water_distance(x,z)<.35:return False
 if -19<x<-12 and -1<z<6:return False
 for name,e in STUDY['envelopes'].items():
  px,py,pz=e['position'];w,_,d=e['size'];w,d=(8.0,9.4) if name=='house' else(w,d)
  if abs(x-px)<w/2+.25 and abs(z-pz)<d/2+.25:return False
 return True
planted=0
for i in range(5300):
 x=rng.uniform(-30,29);z=rng.uniform(-30,24)
 if not can_plant(x,z):continue
 density=.50+.25*math.sin(x*.32+z*.18)*math.cos(z*.4)
 if rng.random()>density:continue
 planted+=1;y=height(x,z)
 for n in range(7):
  a=rng.random()*math.tau;h=rng.uniform(.16,.52);center=[x+rng.uniform(-.13,.13),y,z+rng.uniform(-.13,.13)]
  leaf(center,[math.cos(a)*.4,1,math.sin(a)*.4],h,.012,grassBatches[rng.randrange(3)],rng,steps=2)
for i,(v,f) in leafBatches.items():
 o=A.mesh('Canopy leaves '+str(i),v,f,leafM[i]);o['layer']='authored mature foliage'
 for p in o.data.polygons:p.use_smooth=True
for i,(v,f) in grassBatches.items():
 o=A.mesh('Meadow patch grass '+str(i),v,f,grassM[i])
 for p in o.data.polygons:p.use_smooth=True
# Specific anchors expose geography and planting invariants to downstream checks.
for name,e in STUDY['envelopes'].items():
 o=A.empty(name+'_landscape_anchor',e['position']);o['locked_x']=e['position'][0];o['locked_z']=e['position'][2]
(QA/'landscape-layout.json').write_text(json.dumps({'trees':trees,'shrubs':shrubs,'grassClumps':planted,'yard':{'x':[-6,8],'z':[2,12]},'paths':paths,'waterXZ':[-18,8],'waterLevel':WATER_LEVEL,'porchFinishedLevel':PORCH_LEVEL,'lakePolygon':LAKE_POLYGON,'verandaViewpoint':[-14,PORCH_LEVEL+1.2,-.8]},indent=2)+'\n')
save_export('garden-landscape-scenic')
