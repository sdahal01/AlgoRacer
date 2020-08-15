
/* PROJECT INFORMATION:
Class: CPSC 335
Section: 05
Project Number: 03
Project Name: Sorting Race
Team Name: ASC
Team Members: Andrew Ta, Samprayash Dahal
Contact: andrewman8798@csu.fullerton.edu, sdahal@csu.fullerton.edu   -->
*/

var count = 0;
var ic =0;
var mc =0;
var qc =0;
var aInsertion = {}; // insertion sort variables
var iIndex = 1; // index of the element added
var compareIndexInsert = 0; //step will look at this index
var rowNumInsert = 0; //will write to the row number of insertion sort 
var passCompleteInsertion = false; //checks if the pass is done
var completeInsertion = false; //checks if algo is complete

var arrayM = {}; // merge sort variable
var rowMerge = 0; // what row we are merging
var sizeMerge = 1;// the size of each merge
var colorMerge = ["#008000", "#FFA07A", "#00CED1", "#0276FD",
 "#28AE7B", "#50A6C2", "#8DB6CD", "#8F8FBC",
 "#B03060", "#D0A9AA", "#87CEFA", "#E35152", "#969696"]; // the array of colors for the boxes
var groupMerge = 1; // what group to sort
var beginMergec = 0; // start of slicing
var endMergec = 2; //end the parsing
var counterMerge = 0; // steps inpart of the split array
var indexMergex = 0; // index of first array
var indexMergex2= 0; // index of second array
var a1 = {}; // arrays for merge sort
var a2 = {}; // arrays for merge sort
var mPD = false; // check if pass is done to print the display
var mPaD = false; // checks if the merging parts are done
var completeMerge = false; //if algo is complete
// quick sort variables
var arrayQ = {};
var indexPivotQuick= 0;
var indexValueQuick = 0;
var beginIndexQ = 0;
var endIndexQ = 10;
var indexLeftQ = 1; // left and right to scan the array
var indexRightQ = 10;
var stiQ = [];
var foundLeftQ = false;
var foundRightQ = false;
var rowQuickNum = 0;
var passQuickCounter = 1;
var colorQuickElem = [];
var quickPassDone = false;
var completeQ = false;
var finished = false; //checks first algorithm is finished

function draw_rect( ctx, stroke, fill ) 
{
    stroke =  'blue';
    fill = 'grey';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(5, 5, canvas.width - 5, canvas.height - 5);
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}

function draw_grid( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width - 1;
    let height =  rctx.canvas.height - 1;
    rctx.lineWidth = 5;
	rctx.strokeStyle = rstroke; // vertical blue lines

    for ( var ix = 0; ix < width - 5; ix += 40 )
    {
        rctx.beginPath( );
        rctx.moveTo( ix + 5, 5 );
        rctx.lineTo( ix + 5, height + 5);
        rctx.stroke( );
    }

    for ( var iy = 0; iy < height; iy += 40 )
    {
        rctx.beginPath( );
        rctx.moveTo( 5, iy + 5 );
        rctx.lineTo( width, iy + 5 );
        
        if (iy % rmajor === 0 && iy !== 0)
        {
            rctx.lineWidth = 5;
            rctx.strokeStyle = "red"; //red lines
        }
        else
        {
            rctx.lineWidth = 5;
            rctx.strokeStyle = rstroke; // hotizontal blue like
        }
        rctx.stroke( );
    }
    rctx.restore( );
}

function removeSA()
{
    var test = document.getElementById("SA");
    test.remove();

    // unhide all the cool algorithms
    // document.getElementById("test").style.visibility = "visible";
}

function raceManager() 
{
    // displays name who is the winner and steps completed (to see who finishes first)
    if (completeInsertion)
    {
        finished = true;
        document.getElementById('AlgoSelect').innerHTML = "Selection sort is the winner with " + count + " steps completed!"
    }
    else if (completeMerge)
    {
        finished = true;
        document.getElementById('AlgoSelect').innerHTML = "Merge sort is the winner with " + count + " steps completed!"
    }
    else if (completeQ)
    {
        finished = true;
        document.getElementById('AlgoSelect').innerHTML = "Quick sort is the winner with " + count + " steps completed!"
    }

    if (!finished)
    {
        var canvas = document.getElementById( "grid" );
        var insertion = canvas.getContext( "2d" );
        var canvas2 = document.getElementById( "grid2" );
        var merge = canvas2.getContext( "2d" );
        var canvas3 = document.getElementById( "grid3" );
        var quick = canvas3.getContext( "2d" );
        insertionFuncStep(insertion);
        mergeFuncStep(merge);
        quickFuncStep(quick);
        ++count; //counter display
        document.getElementById('count').innerHTML = count;
    }
}

function drawArray(ctx, myArray, row)
{
    for (var i = 0; i < 12; ++i)
    {
        ctx.save( );
        ctx.fillStyle = "#white";
        ctx.textAlign = "center";
        ctx.font = "20px Arial";
        ctx.fillText(myArray[i], 10 + 20 + 40 * i, 30 + (40 *  row)); 
        ctx.restore( );
    }
}

function insertHighlightElem(ctx, item, index, row) // highlights numbers
{
    ctx.save( );
    ctx.fillStyle = "#f2b90e";
    ctx.textAlign = "center";
    ctx.font = "20px Arial";
    ctx.fillText(item, 10 + 20 + 40 * index, 30 + (40 *  row)); 
    ctx.restore( );
}

function boxFilled(ctx, index, colorIndex) //grid values for mergesort
{
    ctx.beginPath();
    stroke =  'blue';
    fill = colorMerge[colorIndex];
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.rect(5 + 40 * index, 5 + 40 * rowMerge, 40, 40);
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}
// black line on inserrtion sort
function lineInsertDraw(ctx, index)
{
    ctx.save( );
    ctx.beginPath();
	ctx.fillStyle = "green";
    ctx.moveTo(5 + 40 * index, 5 + 40 * rowNumInsert);
    ctx.lineTo(5 + 40 * index, 45 + 40 * rowNumInsert);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore( );
}

window.onscroll = function() {myFunction()}; // when the window is scrolled
var navigation = document.getElementById("navigation"); // get the navigation element
var sticky;
function myFunction() {
    
}
function quickFuncStep(quick)
{
    if (!quickPassDone)
    {
        if (!foundLeftQ)
        {
            
            if (indexLeftQ > indexRightQ)
            {
                    quickPassDone = true;               
            }
            else
            {
                //scans left to right to find value bigger than pivot
                if (arrayQ[indexLeftQ] <= indexValueQuick)
                {
                    ++indexLeftQ;
                }
                else
                {
                    foundLeftQ = true;
                }
            }
        }
        else if (!foundRightQ)
        {
            
            if (indexRightQ < indexLeftQ)
            {
                quickPassDone = true;
            }
            else
            {
                if (arrayQ[indexRightQ] > indexValueQuick)
                {
                    --indexRightQ;
                }
                else
                {
                    foundRightQ = true;
                }   
            }
        }

        //elements are swaped
        if (foundLeftQ && foundRightQ)
        {
            var temp = arrayQ[indexRightQ];
            arrayQ[indexRightQ] = arrayQ[indexLeftQ];
            arrayQ[indexLeftQ] = temp;
            foundLeftQ = false;
            foundRightQ = false;
        }
        // pass is complete, switch  pivot with right index
        if (quickPassDone)
        {
            // elements found to be swapped
            if (quickPassDone && foundLeftQ)
            {
                console.log("quickPassDone && foundLeftQ");
                // swaps pivot value with one less than found value
                var temp = arrayQ[indexLeftQ - 1];
                arrayQ[indexLeftQ - 1] = indexValueQuick;
                arrayQ[indexPivotQuick] = temp;
                indexPivotQuick = indexLeftQ - 1;
            }
            //out of bounds and elements are smaller than  pivot
            else if (quickPassDone && indexLeftQ > endIndexQ)
            {
                console.log("quickPassDone and left went out of bounds");
                // swaps pivot value with last value(all bigger)
                var temp = arrayQ[indexLeftQ - 1];
                arrayQ[indexLeftQ - 1] = indexValueQuick;
                arrayQ[indexPivotQuick] = temp;
                indexPivotQuick = indexLeftQ - 1;
            }
            else if (quickPassDone)
            {
                console.log("quickPassDone");
                // swaps pivot value with last value (all bigger)
                var temp = arrayQ[indexLeftQ];
                arrayQ[indexLeftQ] = indexValueQuick;
                arrayQ[indexPivotQuick] = temp;
                indexPivotQuick = indexLeftQ;
            }

            // pushes pivot index to array items to be color(all sorted)
            colorQuickElem.push(indexPivotQuick);
            console.log("indexPivotQuick: " + indexPivotQuick);
            console.log("indexLeftQ: " + indexLeftQ);
            console.log("indexRightQ: " + indexRightQ);//prints everytime 
            // gets new range of left and right indexes for parting array
            if (indexPivotQuick - 1 > beginIndexQ)
            {
                console.log("indexPivotQuick - 1 > indexLeftQ " + [beginIndexQ, (indexPivotQuick - 1)]);
                stiQ.push([beginIndexQ, (indexPivotQuick - 1)]);
            }
            else
            {
                //must be sorted
                (indexPivotQuick - 1 >= 0) ? colorQuickElem.push(indexPivotQuick - 1) : false;
            }

            if (indexPivotQuick + 1 < endIndexQ)
            {
                console.log("indexPivotQuick + 1 < indexRightQ " + [(indexPivotQuick + 1), endIndexQ]);
                stiQ.push([(indexPivotQuick + 1), endIndexQ]);
            }   
            else
            {
                //must be sorted
                (indexPivotQuick + 1 < 12) ? colorQuickElem.push(indexPivotQuick + 1) : false;
            }  

            //print everytime full pass complete
            --passQuickCounter;
            if (passQuickCounter == 0) 
            {
                passQuickCounter = stiQ.length;
                drawArray(quick, arrayQ, rowQuickNum);

                // colors sorted elements
                for (var i = 0; i < colorQuickElem.length; ++i)
                {
                    insertHighlightElem(quick, arrayQ[colorQuickElem[i]], colorQuickElem[i], rowQuickNum);
                }
                console.log(colorQuickElem);
                ++rowQuickNum;
            }   

            if (stiQ.length == 0)
            {
                completeQ = true;
            }
            else
            {
                var indexes = stiQ[0];
                stiQ.splice(0,1);
                console.log(indexes);
                beginIndexQ = indexes[0];
                indexLeftQ = beginIndexQ;
                indexRightQ = indexes[1];
                endIndexQ = indexRightQ;
                indexValueQuick = arrayQ[beginIndexQ];
                indexPivotQuick = beginIndexQ;
                ++indexLeftQ;
                
            }
            console.log("beginIndexQNew: " + beginIndexQ);
            console.log("indexLeftQNew: " + indexLeftQ);
            console.log("indexValueQuickNew: " + indexValueQuick);

            foundLeftQ = false;
            foundRightQ = false;
            quickPassDone = false;
        }
    }
}

function insertionFuncStep(insertion)
{
    if(aInsertion[iIndex].charCodeAt(0) < aInsertion[compareIndexInsert].charCodeAt(0))
    {
       
        // avoid from going out of bounds
        if(compareIndexInsert == 0)
        {
            passCompleteInsertion = true;
        }
        else
        {
            // decrements to check new value is bigger
            --compareIndexInsert;
        }
    }
    else
    {
        // found correct position end the loop
        passCompleteInsertion = true;   
        ++compareIndexInsert;
    }

    if (passCompleteInsertion)
    {
        //false
        passCompleteInsertion = false;
        // shift elements to new correct position
        insertionFuncShift(compareIndexInsert);

        // draws new sorted array
        drawArray(insertion, aInsertion, rowNumInsert);
        insertHighlightElem(insertion, aInsertion[compareIndexInsert], compareIndexInsert, rowNumInsert);
        lineInsertDraw(insertion, iIndex + 1);
        ++rowNumInsert; // updates row number to write to
        ++iIndex; // new element positon
        compareIndexInsert = iIndex - 1; // new comparison index
        if(iIndex == 12) // checks if completed all the passes
        {
            completeInsertion = true;
        }
    }
}

function insertionFuncShift(newIndex)
{
    var insertValue = aInsertion[iIndex]; // temp value for array
    for(var i = iIndex; newIndex < i; --i) // shifts all elements down to new position
    {
        aInsertion[i] = aInsertion[i - 1];
    }
    aInsertion[newIndex] = insertValue; // inserts new value to new correct location
}
function mergeFuncStep(merge)
{
    if (indexMergex < a1.length && indexMergex2 < a2.length)
    {
        if (a1[indexMergex] < a2[indexMergex2])
        {
            arrayM[beginMergec] = a1[indexMergex];
            ++indexMergex;
            ++beginMergec;
        }
        else
        {
             arrayM[beginMergec] = a2[indexMergex2];
            ++indexMergex2;
            ++beginMergec;
        }
    }
    //first array has been sorted
    else if (indexMergex == a1.length && indexMergex2 < a2.length)
    {
        // adds rest of the a2 to the arrayM
        for (beginMergec; beginMergec < endMergec; ++beginMergec)
        {
             arrayM[beginMergec] = a2[indexMergex2];
            ++indexMergex2;
        }
        mPaD = true;
    }
    //second has been sorted
    else if (indexMergex2 == a2.length && indexMergex < a1.length)
    {
        // adds rest of the a1 to the arrayM
        for (beginMergec; beginMergec < endMergec; ++beginMergec)
        {
            arrayM[beginMergec] = a1[indexMergex];
            ++indexMergex;
        }
        mPaD = true;
    }
    // both arrays have  been sorted now merge pass is complete
    else
    {
        mPaD = true;
    }

    // resets counters, checks if the pass is complete
    if (mPaD)
    {
        indexMergex = 0;
        indexMergex2 = 0;
        mPaD = false;

        beginMergec = endMergec;
        endMergec += sizeMerge * 2;
        if (endMergec > 12)
        {
            mPD = true;
        }
        else 
        {
            a1 = arrayM.slice(beginMergec, beginMergec + sizeMerge);
            a2 = arrayM.slice(beginMergec + sizeMerge, endMergec);
        }
        ++groupMerge;
        if (groupMerge > (12 / Math.pow(2, rowMerge)) || mPD)
        {
            //console.log("mPD, resetting pass.");
            mPD = false;
            mPaD = false;
            groupMerge = 0;
            var colorIndex = 0;
            for (var i = 0; i < 12; ++i)
            {
                if ((i % (sizeMerge * 2)) == 0)
                {
                    ++colorIndex;
                }
                boxFilled(merge, i, colorIndex);
                
            }
            drawArray(merge, arrayM, rowMerge);
            ++rowMerge;
            if (rowMerge > Math.ceil(Math.log(12)/Math.log(2)))
            {
                completeMerge = true;
            }
            beginMergec = 0;
            endMergec = Math.pow(2, rowMerge)
            sizeMerge *= 2;
			a1 = arrayM.slice(beginMergec, beginMergec + sizeMerge);
			a2 = arrayM.slice(beginMergec + sizeMerge, endMergec);
            
        }
    }
}
