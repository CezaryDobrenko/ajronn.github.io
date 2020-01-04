$(function ()
{
    $('a').click(function ()
	{
		var thisA=$(this);
        $('#content').fadeOut(100,function ()
		{
			$('#content').load("main.html",function ()
			{
               $('#content').fadeIn(100);

            });
			
            $('#content').load(thisA.attr('href'),function ()
			{
               $('#content').fadeIn(100);

            });
        });

		return false;
    });

});