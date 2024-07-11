function getArray(isSubmitted) {

  let input = document.getElementById('arrayInput').value;
  let array = input.split(",").map(Number);
  let size = array.length;
  let trapped = trappedWater(array);
  let filledArray = trapped.array;
  let maxElement = Math.max(...array);

  createTable(maxElement + 1, size, array, filledArray, false);

  if (isSubmitted) {
    let divContainer = document.getElementById('divContainer');
    let newDiv = document.createElement('div');
    newDiv.textContent = "Total water accumulated is : " + trapped.total + " units";
    divContainer.appendChild(newDiv);
    createTable(maxElement + 1, size, array, filledArray, true);
  }
}

function trappedWater(height) {

  let left = 0;
  let right = height.length - 1;
  let leftMax = height[left];
  let rightMax = height[right];
  let water = 0;
  let filledArray = height.flatMap((x) => x);

  while (left < right) {
    if (leftMax < rightMax) {
      left++;
      leftMax = Math.max(leftMax, height[left]);
      filledArray[left] = leftMax;
      water += leftMax - height[left];
    } else {
      right--;
      rightMax = Math.max(rightMax, height[right]);
      filledArray[right] = rightMax;
      water += rightMax - height[right];
    }
  }

  let ans = {
    array: filledArray,
    total: water
  };

  return ans;
}


function createTable(rows, cols, array, filledArray, isSubmitted) {

  if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
    alert('Please enter valid numbers for rows and columns.');
    return;
  }

  let tableContainer = document.getElementById(isSubmitted ? 'answerContainer' : 'tableContainer');
  tableContainer.innerHTML = '';

  let table = document.createElement('table');
  table.style.border = '1px solid black';
  table.style.borderCollapse = 'collapse';

  for (let i = 0; i < rows; i++) {

    let tr = document.createElement('tr');

    for (let j = 0; j < cols; j++) {

      let td = document.createElement('td');
      td.style.padding = '10px';
      td.style.border = '1px solid black';
      td.style.borderCollapse = 'collapse';
      if (i >= rows - filledArray[j]) {
        td.style.backgroundColor = 'blue';
      }

      if (i >= rows - array[j]) {
        if (!isSubmitted) td.style.backgroundColor = 'brown';
        else td.style.backgroundColor = 'white';
      }

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  tableContainer.appendChild(table);
}
