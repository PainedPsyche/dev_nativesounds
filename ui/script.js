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
            dropdown.empty();
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

$('input[type=radio][name=native]').change(function() {
    if (this.value == '0') {
        $.post('https://dev_nativesounds/changeNative', JSON.stringify({native:'FRONTEND'}));
    }
    else if (this.value == '1') {
        $.post('https://dev_nativesounds/changeNative', JSON.stringify({native:'SOUND'}));
    }
});