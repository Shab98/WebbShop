function getPositionInArray (array, id) {
    let position = -1;
    let i = 0;
        while (i < array.length) {
            if( id == array[i]._id ) {
                position = i;
                break;
            } 
            i++;
        }
    return position;
}

module.exports = getPositionInArray;