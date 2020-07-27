import React, { useRef, useState, useEffect, useContext } from "react";
import BagContext from "../../context/bag/bagContext";

const FlightChart = ({ bag, pwr }) => {
  const chartObj = {
    name: "Wraith",
    condition: 8,
    discData: {
      distance: 400,
      HST: -19,
      LSF: 61,
      type: "D",
    },
    hand: "rhbh",
    paths: "one",
    lieCirlce: true,
    lieDistance: true,
    pathsShown: "one",
    markLie: true,
  };

  const [labels, setLabels] = useState([]);
  const [flight, setFlight] = useState(chartObj);
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
    firstLoad: true
  });

  var parentDiv = useRef(null);
  var canvas = useRef(null);
  var pathBuffer = useRef(null);
  var lieBuffer = useRef(null);
  var outlineBuffer = useRef(null);
  const spr = [0, 0, 0, 0, 0, 0, 255, 255];
  const spg = [255, 255, 255, 255, 255, 255, 255, 0];
  const spb = [0, 0, 0, 0, 0, 0, 0, 0];

  const yscale = 2.5,
    xscale = 0.7;

  function hb(n) {
    var s = Math.floor(n).toString(16);
    if (s.length === 1) s = "0" + s;
    return s;
  }

  function resetBuffers() {
    const context = canvas.current.getContext("2d");
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);
    context.lineWidth = 1.0;
    context.font = "9px helvetica";
    context.fillStyle = "#999";
    context.strokeStyle = "#446";
    var i;
    for (i = 0; i < canvas.current.width; i += 50) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, canvas.current.height);
      context.stroke();
    }

    for (i = canvas.current.height; i - 15 >= 0; i -= 25) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.current.width, i);
      context.stroke();
      context.textAlign = "left";
      context.fillText(canvas.current.height - i + "'", 0, i - 3);
      context.textAlign = "right";
      context.fillText(
        Math.floor((canvas.current.height - i) / 3.33) + "m",
        canvas.current.width,
        i - 3
      );
    }
    const pathContext = pathBuffer.current.getContext("2d");
    const lieContext = lieBuffer.current.getContext("2d");
    const outlineContext = outlineBuffer.current.getContext("2d");
    pathContext.clearRect(0, 0, canvas.current.width, canvas.current.height);
    lieContext.clearRect(0, 0, canvas.current.width, canvas.current.height);
    outlineContext.clearRect(0, 0, canvas.current.width, canvas.current.height);
  }

  function catmull(p, i, pc) {
    var y0, y1, y2, y3;
    var a, b, c, d;
    var k = Math.floor(i * (pc - 1));
    var t = i * (pc - 1) - k;
    y0 = k > 0 ? p[k - 1] : p[0] + (p[0] - p[1]);
    y1 = p[k];
    y2 = k < pc - 1 ? p[k + 1] : p[pc - 1];
    y3 = k < pc - 2 ? p[k + 2] : p[pc - 1] + (p[pc - 1] - p[pc - 2]);
    a = y1 * 2.0;
    b = -y0 + y2;
    c = y0 * 2.0 - y1 * 5.0 + y2 * 4.0 - y3;
    d = -y0 + y1 * 3.0 - y2 * 3.0 + y3;
    return 0.5 * (a + b * t + c * t * t + d * t * t * t);
  }

  function drawPath(dist, hss, lsf, armspeed, wear, color, paths, rhbh) {
    var pathContext = pathBuffer.current.getContext("2d");
    pathContext.strokeStyle = color;
    pathContext.lineWidth = 2.4;

    var airspeed = armspeed;
    var ehss = hss,
      elsf = lsf;
    var turnsign = rhbh === "rhbh" ? 1.0 : -1.0;
    var fadestart = 0.4 + (1.0 - airspeed * airspeed) * 0.3;
    var impact = (1.0 - airspeed) / 5;
    var turnend = 0.8 - airspeed * airspeed * 0.36;
    var x, y;
    var ox = canvas.current.width / 2;
    var oy = canvas.current.height;
    var vx = 0.0,
      vy = -1.0;
    var ht = yscale * dist;
    var deltav = yscale / ht;
    var wm = wear / 10.0;

    // calculate effective HSS and LSF
    ehss *= 1.0 + 1.0 - wm;
    ehss -= ((1.0 - wm) / 0.05) * (dist / 100);
    elsf *= wm;
    if (airspeed > 0.8) {
      var op = (airspeed - 0.8) / 0.4;
      op *= op * 2;
      var dc = Math.max(0.0, 350 - dist) / 10.0; // emphasize high-speed turn on sub-350ft discs
      ehss -= op * dc;
    }
    ehss *= airspeed * airspeed * airspeed * airspeed;
    elsf *= 1.0 / (airspeed * airspeed);

    // iterate through the flight path
    var yd, yt, yf;
    do {
      y = oy + vy;
      x = ox + vx * xscale;

      airspeed -= deltav;
      if (airspeed > turnend) {
        vx -= turnsign * (ehss / 14000) * (turnend / airspeed);
        yt = canvas.current.height - y;
      }
      if (airspeed < fadestart) {
        vx -= (turnsign * (elsf / 4000) * (fadestart - airspeed)) / fadestart;
      } else {
        yf = canvas.current.height - y;
      }
      if (airspeed > 0.0) {
        if (paths) {
          pathContext.beginPath();
          pathContext.moveTo(ox, oy);
          pathContext.lineTo(x, y);
          pathContext.stroke();
        }
        ox = x;
        oy = y;
      }
    } while (airspeed > impact);
    yd = canvas.current.height - oy;

    // return lie coordinates to caller
    return [x, y];
  }

  function drawLie(x, y, markLie, color, lieColor, lieOutline) {
    var pathContext = pathBuffer.current.getContext("2d");
    var lieContext = lieBuffer.current.getContext("2d");
    var outlineContext = outlineBuffer.current.getContext("2d");

    // mark the lie
    if (markLie) {
      pathContext.strokeStyle = color;
      pathContext.fillStyle = color;
      pathContext.beginPath();
      pathContext.arc(x, y, 2, 0, 2 * 3.1415926);
      pathContext.stroke();
      pathContext.fill();
    }

    // 15m circle around lie
    outlineContext.globalCompositeOperation = "source-over";
    outlineContext.globalAlpha = 1.0;
    outlineContext.fillStyle = lieOutline;
    outlineContext.strokeStyle = lieOutline;
    outlineContext.beginPath();
    outlineContext.arc(x, y, 1.5 * 33, 0, 2 * 3.1415926);
    outlineContext.stroke();
    outlineContext.fill();

    // 10m circle around lie
    lieContext.globalCompositeOperation = "source-over";
    lieContext.globalAlpha = 1.0;
    lieContext.fillStyle = lieColor;
    lieContext.strokeStyle = lieColor;
    lieContext.beginPath();
    lieContext.arc(x, y, 33, 0, 2 * 3.1415926);
    lieContext.stroke();
    lieContext.fill();
  }

  function updateCanvas() {
    setLabels([]);
    var pwi = pwr;
    var pw = 0.6 + (pwi / 48) * 0.6;
    var pc;
    var pws;
    var ry;
    var gy;
    var by;
    const paths = flight.paths;
    var lieColors = {
      D: "#ffffff",
      F: "#faafaa",
      M: "#aaaaff",
      P: "#afaafa",
    };
    var lieOutlines = {
      D: "#888888",
      F: "#833833",
      M: "#338338",
      P: "#383383",
    };
    var lie;

    resetBuffers();

    const lieLabels = labels;
    if (bag.length > 0) {
      for (const disc of bag) {
        const d = disc.discData;
        let dn = disc.name;
        const dt = d.type;
        const dw = disc.condition;

        if (flight.pathsShown === "all") {
          for (var i = 0; i <= 24; i++) {
            pws = i / 24.0;
            ry = Math.min(255, Math.max(0, Math.floor(catmull(spr, pws, 8))));
            gy = Math.min(255, Math.max(0, Math.floor(catmull(spg, pws, 8))));
            by = Math.min(255, Math.max(0, Math.floor(catmull(spb, pws, 8))));
            var pwf = 0.6 + pws * 0.6;
            var deltap = Math.abs(pw - pwf);
            var a = Math.min(0.4, Math.max(0.3, Math.cos(deltap * 5.5)));
            pc = "#" + hb(a * ry) + hb(a * gy) + hb(a * by);
            lie = drawPath(
              d.distance,
              d.HST,
              d.LSF,
              pwf,
              dw,
              pc,
              flight.paths,
              flight.hand
            );
            drawLie(lie[0], lie[1], true, pc, lieColors[dt], lieOutlines[dt]);
          }
        }
        // draw disc path for selected throw power
        pws = pwi / 48.0;
        ry = Math.min(255, Math.max(0, Math.floor(catmull(spr, pws, 8))));
        gy = Math.min(255, Math.max(0, Math.floor(catmull(spg, pws, 8))));
        by = Math.min(255, Math.max(0, Math.floor(catmull(spb, pws, 8))));
        pc = "#" + hb(ry) + hb(gy) + hb(by);
        lie = drawPath(
          d.distance,
          d.HST,
          d.LSF,
          pw,
          dw,
          pc,
          flight.paths,
          flight.hand
        );
        drawLie(lie[0], lie[1], true, pc, lieColors[dt], lieOutlines[dt]);
        lieLabels.push([lie, dn]);
      }
    }

    const context = canvas.current.getContext("2d");
    context.globalAlpha = 0.35;
    context.globalCompositeOperation = "source-over";
    context.drawImage(outlineBuffer.current, 0, 0);
    context.globalAlpha = 0.15;
    context.globalCompositeOperation = "source-over";
    context.drawImage(lieBuffer.current, 0, 0);
    context.globalAlpha = 1.0;
    context.globalCompositeOperation = "source-over";
    context.drawImage(pathBuffer.current, 0, 0);

    for (let key = 0; key < lieLabels.length; key++) {
      var li = lieLabels[key][0];
      var dn = lieLabels[key][1];
      var txt =
        canvas.current.height -
        li[1] +
        "'  " +
        Math.floor((canvas.current.height - li[1]) / 3.33) +
        "m";
      context.font = "10px helvetica";
      context.textAlign = "center";
      context.strokeStyle = "#000";
      context.fillStyle = "#c0ffee";
      context.lineWidth = 3;
      context.strokeText(txt, li[0], li[1] - 6);
      context.fillText(txt, li[0], li[1] - 6);
      context.font = "9px helvetica";
      context.strokeText(dn, li[0], li[1] - 18);
      context.fillText(dn, li[0], li[1] - 18);
    }
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerHeight !== dimensions.height) {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
          firstLoad: false
        });
      }
    }
    if(dimensions.firstLoad){
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
        firstLoad: false
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    
    canvas.current.style.width ='100%';
    canvas.current.style.height='100%';
    canvas.current.width = canvas.current.offsetWidth;
    canvas.current.height = canvas.current.offsetHeight;
    pathBuffer.current.width = canvas.current.offsetWidth;
    pathBuffer.current.height = canvas.current.offsetHeight;
    lieBuffer.current.width = canvas.current.offsetWidth;
    lieBuffer.current.height = canvas.current.offsetHeight;
    outlineBuffer.current.width = canvas.current.offsetWidth;
    outlineBuffer.current.height = canvas.current.offsetHeight;
    updateCanvas();
    
    return () => window.removeEventListener("resize", handleResize);
  }, [bag, dimensions, pwr]);

  return (
    <div ref={parentDiv} id="test" style={{ width: "90%", height: "90%", minHeight:"90%", maxHeight:"90%" }}>
      <canvas
        ref={canvas}
        style={{ border: "1px solid #000" }}
        id="splinecanvas"
      >
        <canvas ref={pathBuffer}></canvas>
        <canvas ref={lieBuffer}></canvas>
        <canvas ref={outlineBuffer}></canvas>
      </canvas>
    </div>
  );
};

export default FlightChart;

// Notes on Flight Chart Script:

//     initial vars: yscale, xscale, canvas, pathBuffer, lieBuffer, outlineBuffer, splinepoints x 3

//     functions:
//          - hb(n)   --   return formatted 8-bit hex byte for integer n  - return string of int
//          - catmull(p,i,c)   --   catmull-rom spline interpolation  -  return int
//          - resetBuffers()  --  clear canvas and render buffers
//              --- call canvas.getContext('2d')
//          - drawLie(x, y, markLie, color, lieColor, lieOutline) - draws on canvas
//              ---  x & y are first and second elements of return array from drawPath()
//              ---  lieOutline is lieoutlines[dt]  -  dt is d[3]  -  d is var d = $("input.disc-data", this).val().split(","); which is "distance, HST, LSF, str(P,M etc)"
//              ---
//              ---
//          - drawPath(dist, hss, lsf, armspeed, wear, color, drawPath)  --  draws path and returns [x,y] which are used in pathContext.lineTo(x,y)
//              --- acesses right or left hand via jquery
//              --- drawPath variable input is ''one'' or ''all''
//          - updateCanvas()
//              --- class resetBuffers()
//              --- class hb()
//              --- jQuery calls ("td.disc-in-bag")
//              --- jQuery calls ("td.disc-in-bag")
//              --- honestly calls jquery a lot, reference while coding
//              --- d[3] is called.
//              --- drawPath() and drawLie() are called
//              --- lieLabels is updated with lieLables.push([lie, dn])
//          - $(document).ready(function ()  DOM RENDER FUNCITNO
//                  canvas = document.getElementById("splinecanvas");
//                  pathBuffer = document.createElement('canvas');
//                  pathBuffer.width = canvas.width;
//                  pathBuffer.height = canvas.height;
//                  lieBuffer = document.createElement('canvas');
//                  lieBuffer.width = canvas.width;
//                  lieBuffer.height = canvas.height;
//                  outlineBuffer = document.createElement('canvas');
//                  outlineBuffer.width = canvas.width;
//                  outlineBuffer.height = canvas.height;
//              --- paints initial canvas
//  So here's how it goes down:
//      -   On Dom render, set canvas element to variable. Creates 3 additional canvas elements
//      -   UpdateCanvas() is called to draw the initial canvas
//      -   updateCanvas() calls doc info (would be state/props) and then resetsBuffers, drawPath() and drawLie(). lieLables is updated
//      -
