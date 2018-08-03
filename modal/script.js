$(document).ready(function () {
    $('.open-modal').click(function () {
        openModal($(this));
    });

    $('.modal-body .close').click(function () {
        closeModal($(this));
    });


    function openModal(button) {
        var windowId = button.data('target');
        $(windowId).show();
    }

    function closeModal(closeElement) {
        closeElement.closest('.modal').hide();
    }
});