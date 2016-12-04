# <h2>JS-Form-Validator<h2>(Not Finished)<br>
Javascript Form Validator (not Jquery)<br>
Javascript Form Validation more than 15 rules<br>
#Usable
Javascript:
<pre>
Form.Validate('#form',{
	name:'required|min:3|max:32|alpha',
	surname:'required|min:5|max:32|alpha',
	age:'required|numeric'
});
</pre>	
Html:
<pre>
<xmp>
   <form id="form" action="get.php">
	<input type="name" name="name" />
	<span error="name"></span>
	<input type="text" name="surname" />
	<span error="surname"></span>
	<input type="text" name="age" />
	<span error="age"></span>
  </form>
</xmp>
</pre>
#Documentation<br>
<pre>
<strong>AutoSend:</strong><br>
Form.autoSend = true;<br>
<strong>Callback:</strong><br>
Form.callback = function(){}<br>
Rules:<br>
-required<br>
-min<br>
-max<br>
-between<br>
-min_size <strong>(File Size by Bytes)</strong><br>
-max_size <strong>(File Size by Bytes)</strong><br>
-alpha<br>
-alpha_numeric<br>
-alpha_dashes<br>
-alpha_spaces<br>
-numeric<br>
-numeric_spaces<br>
-numeric_dashes<br>
-regexp (string value)<br>
-email<br>
-url<br>
-image<br>
-max_img_w <strong>(Maximal value of image width)</strong><br>
-min_img_w<br>
-max_img_h<br>
-min_img_h<br>
-img_w (Image Width)<br>
-img_h (Image Height)<br>
-file_f <strong>(Extension of file) (array value ["txt","jpg","png"])</strong><br>
-date<br>
-time<br>
-date_time<br>
-accepted<br>
-different <strong>(array value ["5","6","7"])</strong><br>
-in <strong>(array value ["5","6","7"])</strong><br>
</pre>
  
