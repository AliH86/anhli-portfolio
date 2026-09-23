"""Reproducible camera/elevation study, NOT an approved scene or global feasibility proof.

Fits A1 envelopes at locked x/z positions. Numeric x/z camera pose, footing y,
and all envelope dimensions except house height are explicit study assumptions.
The portrait projection comparison is algebraic and does not depend on the fit.
"""
from pathlib import Path
import json, math, itertools
import numpy as np
from scipy.optimize import least_squares

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'source/garden/production'
OUT = ROOT / 'docs/qa/garden-proof'
lock = json.loads((SOURCE / 'composition-lock.json').read_text())
names = ['house', 'workspace', 'greenhouse', 'stall']
sizes = {'house': [7, 6.2, 5], 'workspace': [4.5, 3, 2.4],
         'greenhouse': [5.6, 3.5, 4.1], 'stall': [5.4, 3.2, 3.4]}
targets = np.array([lock['landmarks'][n]['a1Rect'] for n in names])
target_centres = targets[:, :2] + targets[:, 2:] / 2
aspect = 16 / 9
pitch = math.radians(2)
fov = math.radians(38)

def corners(name, footing):
    w, h, d = sizes[name]
    x, z = lock['landmarks'][name]['xz']
    return np.array([[x+sx*w/2, footing+sy*h, z+sz*d/2]
                     for sx, sy, sz in itertools.product([-1, 1], [0, 1], [-1, 1])])

def project(points, pose, vfov=38, screen_aspect=aspect, eye=1.62, pitch_down=2):
    x, z, yaw = pose
    pitch=math.radians(pitch_down)
    delta = points - [x, eye, z]
    right = delta[:, 0]*math.cos(yaw) + delta[:, 2]*math.sin(yaw)
    forward = delta[:, 0]*math.sin(yaw) - delta[:, 2]*math.cos(yaw)
    up = delta[:, 1]*math.cos(pitch) + forward*math.sin(pitch)
    depth = forward*math.cos(pitch) - delta[:, 1]*math.sin(pitch)
    t = math.tan(math.radians(vfov)/2)
    return np.column_stack([.5 + right/depth/(2*t*screen_aspect), .5-up/depth/(2*t)])

def rectangles(params):
    result = []
    for i, name in enumerate(names):
        p = project(corners(name, params[3+i]), params[:3])
        lo, hi = p.min(axis=0), p.max(axis=0)
        result.append([*lo, *(hi-lo)])
    return np.array(result)

def residual(params):
    rects = rectangles(params)
    centres = rects[:, :2] + rects[:, 2:] / 2
    return np.r_[((centres-target_centres)*4).ravel(),
                 ((rects[:, 2:]-targets[:, 2:])*.7).ravel()]

solutions=[]
for x in [-10, 0, 15, 25]:
    for z in [20, 35, 55]:
        solutions.append(least_squares(residual, [x,z,-.3,-2.7,-2.1,-1.6,-2.6],
            bounds=([-40,14,-1.2,-8,-8,-8,-8],[40,100,1.2,2,2,2,2]),
            max_nfev=1500,ftol=1e-12,xtol=1e-12,gtol=1e-12))
solution=min(solutions,key=lambda s:s.cost)
params=solution.x
rects=rectangles(params)
centres=rects[:,:2]+rects[:,2:]/2
errors=np.linalg.norm(centres-target_centres,axis=1)

# Under unchanged camera pose, both axes rescale analytically when only FOV/aspect change.
# Uses the source frame rectangles directly; no model dimensions/elevations involved.
ratio_x=(16/9)*math.tan(math.radians(38)/2)/((9/16)*math.tan(math.radians(52)/2))
ratio_y=math.tan(math.radians(38)/2)/math.tan(math.radians(52)/2)
portrait={}
for n,rect in zip(names,targets):
    cx,cy=rect[:2]+rect[2:]/2
    portrait[n]={'center':[.5+(cx-.5)*ratio_x,.5+(cy-.5)*ratio_y],
                 'rect':[.5+(rect[0]-.5)*ratio_x,.5+(rect[1]-.5)*ratio_y,rect[2]*ratio_x,rect[3]*ratio_y]}
equivalent_fov=math.degrees(2*math.atan((16/9)/(9/16)*math.tan(math.radians(38)/2)))

study={'status':'composition-study; not production art; no approved camera replacement',
 'fit':{'verticalFov':38,'eyeHeight':1.62,'pitchDownDegrees':2,
        'position':[float(params[0]),1.62,float(params[1])],
        'yawRadians':float(params[2]),'aspect':aspect,
        'maxCentreErrorFraction':float(max(errors)),
        'centreTolerancePass':bool(max(errors)<.03),
        'limitations':'Fits four architecture envelope centres in A1 only. Yard/horizon/host, actual silhouettes, A2/A3 and UI have not passed acceptance.'},
 'envelopes':{n:{'position':[lock['landmarks'][n]['xz'][0],float(params[3+i]),lock['landmarks'][n]['xz'][1]],
                 'size':sizes[n],'targetRect':targets[i].tolist(),'projectedRect':rects[i].tolist(),
                 'centreErrorFraction':float(errors[i]),'assumption':'Study envelope, not approved architecture dimensions; house height 6.2m is locked.'}
              for i,n in enumerate(names)},
 'mobile':{'status':'Historical clipping evidence; user now authorizes independent mobile camera/FOV and relative terrain fitting',
   'lockedFov':52,'horizontalScaleRelativeToDesktop':ratio_x,
   'projectionFromHandoff':portrait,'sameHorizontalFramingVerticalFov':equivalent_fov,
   'options':[{'id':'portrait-dolly','description':'Keep 52-degree vertical FOV; solve a separate portrait camera pose with landmarks unchanged. Needs exception to same-anchor interpretation.'},
              {'id':'portrait-wide','description':f'Keep desktop pose; vertical FOV about {equivalent_fov:.2f} degrees keeps the same horizontal coverage. Needs exception to 52-degree lock; vertical scale differs.'}],
   'lensConventionCaveat':'If the handoff numbers are horizontal rather than vertical FOV, this calculation must be rerun with that convention. Do not silently change the convention.'},
 'unresolved':lock['notes']}

# A review-only camera retreat, maintaining yaw, pitch, eye height and 52-degree
# vertical FOV. Fits house/stall horizontal centres; cannot promise reference size.
# No runtime camera is changed by this proposal.
mobile_names=['house','stall']
mobile_targets=[lock['portrait']['houseRect'],lock['portrait']['stallRect']]
def mobile_residual(p):
    values=[]
    for name,target_rect in zip(mobile_names,mobile_targets):
        i=names.index(name)
        uv=project(corners(name,params[3+i]),[p[0],p[1],params[2]],52,9/16)
        centre=(uv.min(axis=0)+uv.max(axis=0))/2
        values.append(centre[0]-(target_rect[0]+target_rect[2]/2))
    return values
mobile_solution=least_squares(mobile_residual,[params[0]+12,params[1]+35],
    bounds=([-50,params[1]],[100,180]),xtol=1e-12,gtol=1e-12,ftol=1e-12)
mobile_pos=[float(mobile_solution.x[0]),1.62,float(mobile_solution.x[1])]
study['mobile']['retreatProposal']={'status':'REVIEW ONLY; not approved',
  'position':mobile_pos,'yawRadians':float(params[2]),'verticalFov':52,'pitchDownDegrees':2,
  'translationMetres':float(np.linalg.norm(mobile_solution.x-params[:2])),
  'rectangles':{},'limitation':'Keeps house/stall centre x positions, but their size and y positions differ from the illustrated mobile plate. Host and UI are not accepted.'}
for name,target_rect in zip(mobile_names,mobile_targets):
    i=names.index(name)
    uv=project(corners(name,params[3+i]),[mobile_pos[0],mobile_pos[2],params[2]],52,9/16)
    lo,hi=uv.min(axis=0),uv.max(axis=0)
    study['mobile']['retreatProposal']['rectangles'][name]={'actual':[*lo.tolist(),*(hi-lo).tolist()],'target':target_rect}
(SOURCE/'camera-study.json').write_text(json.dumps(study,indent=2,ensure_ascii=False)+'\n')
(OUT/'projection-receipt.json').write_text(json.dumps(study,indent=2,ensure_ascii=False)+'\n')
a2={'status':'A2 same A1 x/z/yaw, eye3.4, vertical FOV42, pitch9; same geometry; diagnostic only', 'landmarks':{}}
for i,name in enumerate(names):
    uv=project(corners(name,params[3+i]),params[:3],42,aspect,3.4,9)
    lo,hi=uv.min(axis=0),uv.max(axis=0)
    target=np.array(lock['anchors']['A2']['rectangles'][name])
    error=float(np.linalg.norm((lo+hi)/2-(target[:2]+target[2:]/2)))
    a2['landmarks'][name]={'target':target.tolist(),'actual':[*lo.tolist(),*(hi-lo).tolist()],'centreErrorFraction':error}
a2['maxCentreErrorFraction']=max(e['centreErrorFraction'] for e in a2['landmarks'].values())
a2['centreTolerancePass']=a2['maxCentreErrorFraction']<.03
(OUT/'a2-projection.json').write_text(json.dumps(a2,indent=2)+'\n')
print(json.dumps({'A1_camera':study['fit'],'mobile':study['mobile']},indent=2,ensure_ascii=False))
