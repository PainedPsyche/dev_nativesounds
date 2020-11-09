$(function () {
    var soundsTable = [];

    window.addEventListener('message', function(event) {
        if (event.data.action == 'setVisible') {
            $("body").css("display", event.data.show ? "block" : "none");
        }
        else if (event.data.action == 'populateTable') {
            let dropdown = $('#dropdown');
            dropdown.empty()

            soundsTable = JSON.parse(event.data.content);
            $.each(soundsTable, function(index, array) {
                // console.log(array[2])
                dropdown.append($('<option></option>').attr('value', index + 1).text(array));
            });
        }
    });
});

function closeUI() {
    $.post('https://dev_nativesounds/close', JSON.stringify({}));
}

function playSound() {
    let dropdown = $('#dropdown');
    let selected = $('option:selected', dropdown).attr('value')
    $.post('https://dev_nativesounds/play', JSON.stringify({index:selected}));
}