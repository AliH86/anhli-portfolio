"""Author the repeatable gravel/feathered path surface; no source image edits."""
from pathlib import Path
import numpy as np
from PIL import Image
out=Path(__file__).resolve().parents[1]/'source/garden/production/textures/finish'
out.mkdir(parents=True,exist_ok=True)
r=np.random.default_rng(140926);n=256;y,x=np.mgrid[0:n,0:n];noise=r.random((n,n))-.5
edge=np.minimum(x/(n-1),1-x/(n-1));distance=np.clip((edge-.01-.025*np.sin(y*.16)-noise*.025)/.22,0,1)
alpha=distance*distance*(3-2*distance)
color=np.clip(np.array([139,133,110])[None,None,:]+noise[:,:,None]*32,0,255)
Image.fromarray(np.uint8(np.dstack([color,alpha*255]))).save(out/'gravel-edge.png')
