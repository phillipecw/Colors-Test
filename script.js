// DATA FOR THE COLORS GOES HERE.
// Feel free to add, edit or remove colors.
let dataColors = [{
        "label": "Red",
        "hex": "#ff0000"
    },
    {
        "label": "Green",
        "hex": "#00ff00"
    },
    {
        "label": "Blue",
        "hex": "#0000ff"
    },
    {
        "label": "Orange",
        "hex": "#ff9900"
    },
    {
        "label": "Yellow",
        "hex": "#ffff00"
    }
];

document.addEventListener('DOMContentLoaded', function () {

    // Select the containers for circles and squares
    const circleRow = document.querySelector('.circle-row');
    const squareRow = document.querySelector('.square-row');

    // Add (generate) a circle.
    // Parameters:
    // - hex: Color code in hexadecimal format.
    // - label: Display label for the color.
    // - isNew: Flag to indicate whether the circle is added from a square (false) or not (true).
    const addCircle = (hex, label, isNew) => {
        const circle = document.createElement('div');
        // Create the circle element and apply attributes.
        circle.classList.add('circle');
        circle.style.backgroundColor = hex;

        // Create the text element (for the label) and apply attributes.
        const circleText = document.createElement('span');
        circleText.classList.add('color-text');
        circleText.innerHTML = label;
        circle.appendChild(circleText);

        // Event for "hover" action.
        // Apply 50% opacity for all circles, except the one that is "hovered".
        circle.addEventListener('mouseenter', () => {
            document.querySelectorAll('.circle').forEach(c => {
                if (c !== circle) {
                    c.classList.add('dimmed');
                }
            });
        });
        // Remove opacity when mouse leaves the circle.
        circle.addEventListener('mouseleave', () => {
            clearCircles();
        });
        // Event for "click" action
        // Create a square in "square-row" of the same color and place it last. Also delete the circle.
        circle.addEventListener('click', () => {
            addSquare(hex, label);
            circle.remove();
            clearCircles();
        });

        // If it is added from a square, the circle should be added first in line. 
        isNew ? circleRow.appendChild(circle) : circleRow.insertBefore(circle, circleRow.firstChild);
    };

    // Add (generate) a square.
    // Parameters:
    // - hex: Color code in hexadecimal format.
    // - label: Display label for the color.
    const addSquare = (hex, label) => {
        // Create the square element and apply attributes.
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.backgroundColor = hex;

        // Create the text element (for the label) and apply attributes.
        const squareText = document.createElement('span');
        squareText.classList.add('color-text');
        squareText.innerHTML = label;
        square.appendChild(squareText);

        // Event for "hover" action.
        // Apply 50% opacity for all squares, except the one that is "hovered".
        square.addEventListener('mouseenter', () => {
            document.querySelectorAll('.square').forEach(s => {
                if (s !== square) {
                    s.classList.add('dimmed');
                }
            });
        });
        // Remove opacity when mouse leaves the square 
        square.addEventListener('mouseleave', () => {
            clearSquares();
        });
        // Event for "click" action
        // Create a circle in "circle-row" of the same color and place it first. Also delete the square.
        square.addEventListener('click', () => {
            addCircle(hex, label, false);
            square.remove();
            clearSquares();
        });

        squareRow.appendChild(square);
    };

    // Remove "dimmed" class from all circles to reset opacity.
    // Note: this is a fix, since sometimes after one circle was clicked, the other ones kept the "dimmed" class.
    const clearCircles = () => {
        document.querySelectorAll('.circle').forEach(c => {
            c.classList.remove('dimmed');
        });
    }

    // Remove "dimmed" class from all squares to reset opacity.
    // Note: this is a fix, since sometimes after one square was clicked, the other ones kept the "dimmed" class.
    const clearSquares = () => {
        document.querySelectorAll('.square').forEach(s => {
            s.classList.remove('dimmed');
        });
    }

    // Add circles when page is loaded.
    dataColors.forEach(({hex, label}) => {
        addCircle(hex, label, true);
    });
});