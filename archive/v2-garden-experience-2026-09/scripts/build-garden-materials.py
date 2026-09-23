"""Deterministic authored base-color studies; not scanned or AI-generated images."""
from pathlib import Path
from PIL import Image
import numpy as np
out=Path(__file__).resolve().parents[1]/'source/garden/production/textures'
out.mkdir(parents=True,exist_ok=True)
y,x=np.mgrid[0:512,0:256];rng=np.random.default_rng(913)
g=(np.sin(x*.32+np.sin(y*.013)*2)+.4*np.sin(x*1.7+y*.002)+rng.normal(0,.3,x.shape))*.035
wood=np.stack([.48+g,.38+g*.8,.265+g*.6],-1)
Image.fromarray(np.uint8(np.clip(wood,0,1)*255)).save(out/'weathered-timber.png')
y,x=np.mgrid[0:256,0:256]
w=.025*np.sin(x*np.pi/2)+.019*np.sin(y*np.pi/2)+rng.normal(0,.008,x.shape)
canvas=np.stack([.86+w,.82+w,.70+w],-1)
Image.fromarray(np.uint8(np.clip(canvas,0,1)*255)).save(out/'woven-canvas.png')
