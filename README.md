# JS-Form-Validator #Not Finished
Javascript Form Validator (not Jquery)
Javascript Form Validation more than 15 rules
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

  
