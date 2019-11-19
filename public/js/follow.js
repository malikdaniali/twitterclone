$(function(){

  $(document).on('click', '#follow', function(e) {
    e.preventDefault();

    var user_id = $('#user_id').val();
    $.ajax({
      type: 'POST',
      url: "/follow/" + user_id,
      success: function(data) {
        $('#follow').removeClass('btn-default').addClass('btn-primary')
          .html('Following').attr('id', 'unfollow')
      },
      error: function(data) {
        console.log(data);
      }
    });
  });

  $(document).on('click', '#unfollow', function(e) {
    e.preventDefault();

    var user_id = $('#user_id').val();
    $.ajax({
      type: 'POST',
      url: "/unfollow/" + user_id,
      success: function(data) {
        $('#unfollow').removeClass('btn-primary btn-danger').addClass('btn-default')
          .html('Follow').attr('id', 'follow')
      },
      error: function(data) {
        console.log(data);
      }
    });
  });

  $(document).on('mouseenter', '#unfollow', function(e) {
    $(this).removeClass('btn-primary').addClass('btn-danger').html('Unfollow');
  });

  $(document).on('mouseleave', '#unfollow', function(e) {
    $(this).removeClass('btn-danger').addClass('btn-primary').html('Following');
  });







})
