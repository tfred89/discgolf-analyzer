import React from 'react'

const FlightChart = () => {
    return (
        <div>
            
        </div>
    )
}

export default FlightChart 


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
                    // canvas = document.getElementById("splinecanvas");
                    // pathBuffer = document.createElement('canvas');
                    // pathBuffer.width = canvas.width;
                    // pathBuffer.height = canvas.height;
                    // lieBuffer = document.createElement('canvas');
                    // lieBuffer.width = canvas.width;
                    // lieBuffer.height = canvas.height;
                    // outlineBuffer = document.createElement('canvas');
                    // outlineBuffer.width = canvas.width;
                    // outlineBuffer.height = canvas.height;
//              --- paints initial canvas
//  So here's how it goes down:
//      -   On Dom render, set canvas element to variable. Creates 3 additional canvas elements
//      -   UpdateCanvas() is called to draw the initial canvas
//      -   updateCanvas() calls doc info (would be state/props) and then resetsBuffers, drawPath() and drawLie(). lieLables is updated
//      -   


