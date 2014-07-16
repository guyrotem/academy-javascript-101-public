/**
 * Created by Guy_Rotem on 7/16/14.
 */
"use strict";
function generateUniqNumArray(itemsCount, maxValue)
{
    //    TODO: for n
    var arr = new Array(itemsCount);
    arr = _.map(arr, function(num) { return Math.floor(Math.random() * maxValue); });
    arr = _.uniq(arr);
    return arr;
}

function TreeNode(value, parent, left, right)
{
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
}

function printTree(root, level, printer)
{
    //var outputBase = document.getElementById('board');
    if(root == null)
    {
        //Console.log("Invalid");
        return;
//        output.innerHTML += "&lt;table id=&quot;root&quot;&gt;";
//        output.innerHTML += "&lt;tr&gt;&lt;td&gt;ROOT&lt;/td&gt;";
//        output.innerHTML += "&lt;/tr&gt;&lt;tr&gt;"
    }
    printer(level + " " + root.value);
    printTree(root.left, level+1, printer);
    printTree(root.right, level+1, printer);

}

function printTreeHtml(root, path)
{
    if(!root)
    {
        return;
    }
    var board = document.getElementById(path);
    if(!board)
    {
        console.log("DFDS");
        return;
    }
    var innerHTML = "<table><tr><td>"+ root.value + "</td></tr>" + "<tr><td><table></table></td><td id='"+path+"L'></td><td id='"+path+"R'></td></tr></table>";
    board.innerHTML = innerHTML;
    console.log(innerHTML);
    printTreeHtml(root.left, path+"L");
    printTreeHtml(root.right, path+"R");
    //document.getElementById('level1').innerHTML = "<table><tr><td>test</td></tr></table>";
}


function insertToTree(root, value, isLeftSide)
{
    if(!root || isNaN(value))
    {
        throw new Error();
    }
    if(root.value == null)
    {
        root.value = value;
        return;
    }
    var newNode = new TreeNode(value, root, null, null);

    if(isLeftSide(root.value, value))
    {
        if(root.left == null)
        {
            root.left = newNode;
        }
        else {
            insertToTree(root.left, value, isLeftSide);
        }
    }
    else
    {
        //  root.value <= value
        if(root.right == null)
        {
            root.right = newNode;
        }
        else {
            insertToTree(root.right, value, isLeftSide);
        }
    }
}

function treeMain()
{
    var numArray = generateUniqNumArray(10, 1<<10);
    var treeRoot = new TreeNode(null, null, null, null);
    _.forEach(numArray, function(item) { insertToTree(treeRoot, item, function(origValue, newValue) { return newValue < origValue; } )} );
    //printTree(treeRoot, 0, function(str){console.log(str)});
    printTreeHtml(treeRoot, 'output');
    return treeRoot;
}


//console.log(treeMain());