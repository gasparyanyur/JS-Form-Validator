function Form() {
	this.submit = true;
	this.focus = false;
	this.fileTransfer = false;
	this.formStatus = false;
	this.autoSend = true;
	this.statusArray = [];
	this.status = true;
	this.callback = false;
	var self = this;
	this.Validate = function(form,validator) {
		document.querySelector(form).onsubmit = function(e) {
				e.preventDefault();
				self.statusArray = [];
				if(self.submit !== false) {
					for(var obj in validator) {
						var rules = validator[obj].split('|');
						for(var x = 0; x < rules.length ; x++) {
							var ruleEvent = rules[x].split(':');
							if(ruleEvent.length == 1) {
								if(self.Validator[ruleEvent[0]](obj,form) === true) {
									document.querySelector(form +' [error = "'+obj+'"]').innerHTML = '';
									self.statusArray.push('true');
								} else {
									self.statusArray.push('false')
								}
							} else if (ruleEvent.length == 2) {
								 if(self.Validator[ruleEvent[0]](obj,form,ruleEvent[1]) === true) {
									document.querySelector(form +' [error = "'+obj+'"]').innerHTML = '';
									self.statusArray.push('true')
								 } else {
							 		self.statusArray.push('false')	
								 }
								 
							} else  {
								 if(self.Validator[ruleEvent[0]](obj,form,ruleEvent[1],ruleEvent[2]) === true) {
									document.querySelector(form +' [error = "'+obj+'"]').innerHTML = '';
									self.statusArray.push('true')
								 } else {
							 		self.statusArray.push('false')	
								 }
							}
							
							
						}

						
					}
				}
				
				if(self.statusArray.indexOf('false') == -1) {
					self.status = true;
				} else {
					self.status = false;
				}

				if(self.callback !== false) {
						self.callback();
				} else if (self.autoSend === true) {
					var form_el = document.getElementById(form.replace('#','')),
						form_url = form_el.action,
						form_method = form_el.method,
						form_enctype = form_el.enctype;

						console.log(form_url,form_method,form_enctype);
				}
				
		};
		
			
	
	}


};

Form.prototype.Validator = Object.create({
	required:function(name,form) {
		var value = document.querySelector(form +' [name = "'+name+'"]').value.trim();
		if(value == '') {
			document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'The field is required';
			return false;
		}
		return true;
	},
	min:function(name,form,value) {
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			if(val.length < value) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Min error';
				return false;
			} 
			return true;
		}
		
	},
	max:function(name,form,value) {
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			if(val.length > value) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Max error';
				return false;
			}
			return true;
		}
		
	},
	between:function(name,form,from,to){
		if(this.required.apply(this,arguments) === true) {
			var value =  document.querySelector(form +' [name = "'+name+'"]').value,
				tp = parseInt(value);
			if(isNaN(tp) === true)	{
				var length = value.length;
				if(length < parseInt(from) || length > parseInt(to) ) {
					document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'between error';
					return false;
				}
				return true
			} else {
				if(tp < parseInt(from) || tp > parseInt(to) ) {

					document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'between error';
					return false;
				}
				return true;
			}
		}
		
	},
	min_size:function(name,form,value){
		if(this.required.apply(this,arguments) === true) {
			var size = document.querySelector(form +' [name = "'+name+'"]').files[0].size;
			if(size < value) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'min size error';
				return false;
			}
			return true;
		}
	},
	max_size:function() {
		if(this.required.apply(this,arguments) === true) {
			var size = document.querySelector(form +' [name = "'+name+'"]').files[0].size;
			if(size > value) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'min size error';
				return false;
			}
			return true;
		}
	},
	alpha:function(name,form) {
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			if(/^[a-zA-Z]+$/.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Alpha error';
				return false;
			}
			return true;
		}
		
	},
	alpha_numeric:function(name,form){
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			if(/^[a-zA-Z0-9]+$/.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'AlphaNum error';
				return false
			}
			return true;
		}
	},
	alpha_spaces:function(name, form){
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			if(/^[a-zA-Z\s\/]*$/.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'AlphaSpaces error';
				return false
			}
			return true;
		}
	},
	alpha_dashes:function(name,form){
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			if(/^[a-zA-Z-/]*$/.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'AlphaDashes error';
				return false
			}
		}
	},
	numeric:function(name,form){
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			if(/^[0-9]*$/.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Num error';
				return false
			}
			return true;
		}
	},
	numeric_spaces:function(name,form){
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			if(/^[0-9\s\/]*$/.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'NumSpaces error';
				return false
			}
			return true;
		}
	},
	numeric_dashes:function(name,form){
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			if(/^[0-9-]*$/.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'NumDashes error';
				return false
			}
			return true;
		}
	},
	regexp:function(name,form,value){
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			var rE = new Regexp(value);
			if(rE.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Regexp error';
				return false
			}
			return true;
		}
	},
	email:function(name,form){
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			var rE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if(rE.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'NumDashes error';
				return false
			}
			return true;
		}
	},
	url:function(name,form){
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			var rE = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
			if(rE.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Url error';
				return false
			}
			return true;
		}
	},
	image:function(name,form){
		var array_format = ['jpg','jpeg','png','gif'];
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			if(document.querySelector(form +' [name = "'+name+'"]').type != 'file') {
				console.error('Please Check Your Input type');
				return false;
			} else {
				var image_name = val.split('.');
				if(array_format.indexOf(image_name[image_name.length - 1]) == -1) {
					document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Image error';
					return false;
				}
				return true;
				
			}
			
		}
	},
	min_img_w:function(name,form,value){
		if(this.image.apply(this,arguments) === false) {
			console.error('Please Check Your File Type');
			return false;
		} else {
			var img_w = this.image_load.apply(this,[name,form,'width']);
			if(img_w < value) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Min img width error';
					return false;
			}
			return true;
			
		}
	},
	max_img_w:function(name,form,value){
		if(this.image.apply(this,arguments) === false) {
			console.error('Please Check Your File Type');
			return false;
		} else {
			var img_w = this.image_load.apply(this,[name,form,'width']);
			if(img_w > value) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Min img width error';
					return false;
			}
			return true;
			
		}
	},
	img_w:function(name,form,value){
		if(this.image.apply(this,arguments) === false) {
			console.error('Please Check Your File Type');
			return false;
		} else {
			var img_w = this.image_load.apply(this,[name,form,'width']);
			if(img_w != value) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Min img width error';
					return false;
			}
			return true;
			
		}
	},
	min_img_h:function(name,form,value){
		if(this.image.apply(this,arguments) === false) {
			console.error('Please Check Your File Type');
			return false;
		} else {
			var img_w = this.image_load.apply(this,[name,form,'height']);
			if(img_w < value) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Min img width error';
					return false;
			}
			return true;
			
		}
	},
	max_img_h:function(name,form,value){
		if(this.image.apply(this,arguments) === false) {
			console.error('Please Check Your File Type');
			return false;
		} else {
			var img_w = this.image_load.apply(this,[name,form,'height']);
			if(img_w > value) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Min img width error';
					return false;
			}
			return true;
			
		}
	},
	img_h:function(name,form,value){
		if(this.image.apply(this,arguments) === false) {
			console.error('Please Check Your File Type');
			return false;
		} else {
			var img_w = this.image_load.apply(this,[name,form,'height']);
			if(img_w != value) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'Min img width error';
					return false;
			}
			return true;
			
		}
	},
	image_load:function(name,form,ret) {
		var file = document.querySelector(form +' [name = "'+name+'"]');
		var image = file.files && file.files[0];
		if(image) {
		        var img = new Image();
		        img.src = window.URL.createObjectURL(image);
		        console.log(img.src);
		        console.log(img);
		        img.onload = function() {
		            var width = img.naturalWidth,
		                height = img.naturalHeight;
		                if(ret == 'width') {
		                	return img.naturalWidth;
		                } else {
		                	return img.naturalHeight;
		                }

		            window.URL.revokeObjectURL( img.src );
         	   }

          	
        	
   		 }
	},
	file_f:function(name,form,value) {
		var file = document.querySelector(form +' [name = "'+name+'"]').files[0];
		var format_available = eval(value);
		if(Object.prototype.toString.call(format_available) === '[object Array]') {
			if(format_available.indexOf(file.name.split('.').pop()) == -1) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'File format error';
					return false;
			}
			return true;
		}
	},
	date:function(name,form) {
		
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			var rE = /(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/;
			if(rE.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'date error';
				return false
			}
		}
	},
	time:function(name,form) {
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			var rE = /([01]\d|2[0-3]):([0-5]\d)/;
			if(rE.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'time error';
				return false
			}
			return true;
		}
	},
	date_time:function(name,form) {
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]').value;
			var rE = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;
			if(rE.test(val.trim()) !== true) {
				document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'date_time error';
				return false
			}
			return true;
		}
		
	},
	accepted:function(name,form) {
		if(this.required.apply(this,arguments) === true) {
			var val = document.querySelector(form +' [name = "'+name+'"]');
			if(val.checked === true) {
				return true;
			}
			return false;
		}
		
	},
	different:function(name,form,value) {
		var available = eval(value);
		var val = document.querySelector(form +' [name = "'+name+'"]').value;
		if(available.indexOf(val) > -1) {
			document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'different  error';
			return false
		}
			return true;

	},
	in:function(name,form,value) { 
		var available = eval(value);
		var val = document.querySelector(form +' [name = "'+name+'"]').value;
		if(available.indexOf(val) == -1) {
			document.querySelector(form +' [error = "'+name+'"]').innerHTML = 'in error';
			return false
		}
			return true;
	},
	



})

var Form = new Form();