"""Locally authored repeatable surface studies, with tangent-space normals."""
from pathlib import Path
import numpy as np
from PIL import Image,ImageFilter
out=Path(__file__).resolve().parents[1]/'source/garden/production/textures';out.mkdir(exist_ok=True)
r=np.random.default_rng(1313);n=512
def noise(scale):
 im=Image.fromarray(np.uint8(r.random((scale,scale))*255)).resize((n,n),Image.Resampling.BICUBIC)
 return np.asarray(im).astype(float)/255-.5
def save(name,base,h,strength):
 color=np.clip(np.stack([base[i]+h*(.065 if i<2 else .05) for i in range(3)],-1),0,1)
 Image.fromarray(np.uint8(color*255)).save(out/(name+'.png'))
 dx=(np.roll(h,-1,1)-np.roll(h,1,1))*strength;dy=(np.roll(h,-1,0)-np.roll(h,1,0))*strength
 normal=np.stack([-dx,-dy,np.ones_like(dx)],-1);normal/=np.linalg.norm(normal,axis=-1,keepdims=True)
 Image.fromarray(np.uint8((normal*.5+.5)*255)).save(out/(name+'-normal.png'))
y,x=np.mgrid[0:n,0:n]
save('limewash',(.77,.735,.65),noise(9)*1.0+noise(64)*.4+noise(512)*.15,1.6)
h=.35*np.sin(x*.21+noise(9)*7)+.2*np.sin(x*.63+np.sin(y*.023))+noise(80)*.35
save('bark',(.28,.235,.17),h,2.4)
save('ground-grain',(.72,.74,.64),noise(32)*.6+noise(512)*.65,1.9)

# Restrained crossing ripples, normal source only.
h=.18*np.sin(x*.22+.9*np.sin(y*.05))+.13*np.sin(y*.17+np.sin(x*.033))
dx=np.roll(h,-1,1)-np.roll(h,1,1);dy=np.roll(h,-1,0)-np.roll(h,1,0)
norm=np.stack([-dx,-dy,np.ones_like(dx)],-1);norm/=np.linalg.norm(norm,axis=-1,keepdims=True)
Image.fromarray(np.uint8((norm*.5+.5)*255)).save(out/'water-ripple-normal.png')
