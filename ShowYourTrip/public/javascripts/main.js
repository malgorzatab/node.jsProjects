$(document).ready(function(){

    $('#delete-trip').on('click', function (e) {
        $target = $(e.target);
        const id = $target.attr('value');
        $.ajax({
            type: 'DELETE',
            url: '/'+id,
            success: function (response) {
                alert('Deleting Trip');
                window.location.href='/';
            },
            error: function (err) {
                console.log(err);
            }
        });

    });
});