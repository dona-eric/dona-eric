import React, { useEffect, useRef } from 'react';

const TagCloud = ({ tags, radius = 150 }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let items = [];
    let dtr = Math.PI / 180;
    let mcList = [];
    let active = false;
    let lasta = 1;
    let lastb = 1;
    let distr = true;
    let tspeed = 2;
    let size = 250;
    let mouseX = 0;
    let mouseY = 0;
    let howElliptical = 1;
    let aA = null;
    let oList = null;

    const sineCosine = (a, b, c) => {
      const sa = Math.sin(a * dtr);
      const ca = Math.cos(a * dtr);
      const sb = Math.sin(b * dtr);
      const cb = Math.cos(b * dtr);
      const sc = Math.sin(c * dtr);
      const cc = Math.cos(c * dtr);
      return { sa, ca, sb, cb, sc, cc };
    };

    const update = () => {
      let a;
      let b;

      if (active) {
        a = (-Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
        b = (Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
      } else {
        a = lasta * 0.98;
        b = lastb * 0.98;
      }

      lasta = a;
      lastb = b;

      if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) return;

      const c = 0;
      const { sa, ca, sb, cb, sc, cc } = sineCosine(a, b, c);

      for (let j = 0; j < mcList.length; j++) {
        const rx1 = mcList[j].cx;
        const ry1 = mcList[j].cy * ca + mcList[j].cz * (-sa);
        const rz1 = mcList[j].cy * sa + mcList[j].cz * ca;

        const rx2 = rx1 * cb + rz1 * sb;
        const ry2 = ry1;
        const rz2 = rx1 * (-sb) + rz1 * cb;

        const rx3 = rx2 * cc + ry2 * (-sc);
        const ry3 = rx2 * sc + ry2 * cc;
        const rz3 = rz2;

        mcList[j].cx = rx3;
        mcList[j].cy = ry3;
        mcList[j].cz = rz3;

        const per = 200 / (200 + rz3);

        mcList[j].x = rx3 * per - 2;
        mcList[j].y = ry3 * per - 2;
        mcList[j].scale = per;
        mcList[j].alpha = per;

        mcList[j].alpha = (mcList[j].alpha - 0.6) * (10 / 6);
      }

      doPosition();
      depthSort();
    };

    const depthSort = () => {
      let aTmp = [];
      for (let i = 0; i < aA.length; i++) {
        aTmp.push(aA[i]);
      }
      aTmp.sort((vItem1, vItem2) => {
        if (vItem1.cz > vItem2.cz) {
          return -1;
        } else if (vItem1.cz < vItem2.cz) {
          return 1;
        } else {
          return 0;
        }
      });
      for (let i = 0; i < aTmp.length; i++) {
        aTmp[i].el.style.zIndex = i;
      }
    };

    const positionAll = () => {
      let phi = 0;
      let theta = 0;
      let max = mcList.length;
      for (let i = 1; i < max + 1; i++) {
        if (distr) {
          phi = Math.acos(-1 + (2 * i - 1) / max);
          theta = Math.sqrt(max * Math.PI) * phi;
        } else {
          phi = Math.random() * (Math.PI);
          theta = Math.random() * (2 * Math.PI);
        }
        mcList[i - 1].cx = radius * Math.cos(theta) * Math.sin(phi);
        mcList[i - 1].cy = radius * Math.sin(theta) * Math.sin(phi);
        mcList[i - 1].cz = radius * Math.cos(phi);

        aA[i - 1].style.left = mcList[i - 1].cx + container.offsetWidth / 2 - mcList[i - 1].offsetWidth / 2 + 'px';
        aA[i - 1].style.top = mcList[i - 1].cy + container.offsetHeight / 2 - mcList[i - 1].offsetHeight / 2 + 'px';
      }
    };

    const doPosition = () => {
      let l = container.offsetWidth / 2;
      let t = container.offsetHeight / 2;
      for (let i = 0; i < mcList.length; i++) {
        aA[i].style.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
        aA[i].style.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';
        aA[i].style.fontSize = Math.ceil(12 * mcList[i].scale / 2) + 8 + 'px';
        aA[i].style.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
        aA[i].style.opacity = mcList[i].alpha;
      }
    };

    const initialize = () => {
      aA = container.querySelectorAll('.tag-cloud-item');
      oList = container;

      for (let i = 0; i < aA.length; i++) {
        let oTag = {};
        oTag.offsetWidth = aA[i].offsetWidth;
        oTag.offsetHeight = aA[i].offsetHeight;
        oTag.el = aA[i];
        mcList.push(oTag);
      }

      positionAll();

      oList.onmouseover = () => {
        active = true;
      };

      oList.onmouseout = () => {
        active = false;
      };

      oList.onmousemove = (ev) => {
        let oEvent = window.event || ev;
        let rect = container.getBoundingClientRect();
        mouseX = oEvent.clientX - rect.left - container.offsetWidth / 2;
        mouseY = oEvent.clientY - rect.top - container.offsetHeight / 2;
        mouseX /= 5;
        mouseY /= 5;
      };

      setInterval(update, 30);
    };

    initialize();
  }, [radius, tags]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        minHeight: `${radius * 2.5}px`,
        overflow: 'hidden' 
      }}
    >
      {tags.map((tag, i) => (
        <div 
          key={i} 
          className="tag-cloud-item" 
          style={{ 
            position: 'absolute', 
            color: '#00d4ff', 
            textDecoration: 'none',
            fontWeight: '600',
            fontFamily: "'Space Grotesk', sans-serif",
            textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
            willChange: 'transform, opacity, fontSize',
            transition: 'color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => e.target.style.color = '#ec4899'}
          onMouseLeave={(e) => e.target.style.color = '#00d4ff'}
        >
          {tag.icon && <span style={{ fontSize: '1.2em' }}>{tag.icon}</span>}
          {tag.label}
        </div>
      ))}
    </div>
  );
};

export default TagCloud;
