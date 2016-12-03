# JS-Form-Validator #Not Finished
Javascript Form Validator (not Jquery)
Javascript Form Validation more than 15 rules
#Usable
Javascript:
Form.Validate('#form',{
		name:'required|min:3|max:32|alpha',
		surname:'required|min:5|max:32|alpha',
		age:'required|numeric'
	});
Html:
&lt;form id=&quot;form&quot; action=&quot;get.php&quot;&gt; &lt;input type=&quot;name&quot; name=&quot;name&quot; /&gt; &lt;span error=&quot;name&quot;&gt;&lt;/span&gt; &lt;input type=&quot;text&quot; name=&quot;surname&quot; /&gt; &lt;span error=&quot;surname&quot;&gt;&lt;/span&gt; &lt;input type=&quot;text&quot; name=&quot;age&quot; /&gt; &lt;span error=&quot;age&quot;&gt;&lt;/span&gt; &lt;input type=&quot;number&quot; name=&quot;phone&quot; /&gt; &lt;span error=&quot;phone&quot;&gt;&lt;/span&gt; &lt;input type=&quot;email&quot; name=&quot;email&quot; /&gt; &lt;span error=&quot;email&quot;&gt;&lt;/span&gt; &lt;input type=&quot;submit&quot; /&gt; &lt;/form&gt;
  
