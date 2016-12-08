function Form() {
    this.submit = !0, this.focus = !1, this.asnyncSend = !0, this.autoSendCallBack = !1, this.fileTransfer = !1, this.formStatus = !1, this.autoSend = !0, this.statusArray = [], this.status = !0, this.callback = !1;
    var e = this;
    this.Validate = function(r, t) {
        document.querySelector(r).onsubmit = function(n) {
            if (n.preventDefault(), e.statusArray = [], e.submit !== !1)
                for (var a in t)
                    for (var i = t[a].split("|"), u = 0; u < i.length; u++) {
                        var o = i[u].split(":");
                        1 == o.length ? e.Validator[o[0]](a, r) === !0 ? (document.querySelector(r + ' [error = "' + a + '"]').innerHTML = "", e.statusArray.push("true")) : e.statusArray.push("false") : 2 == o.length ? e.Validator[o[0]](a, r, o[1]) === !0 ? (document.querySelector(r + ' [error = "' + a + '"]').innerHTML = "", e.statusArray.push("true")) : e.statusArray.push("false") : e.Validator[o[0]](a, r, o[1], o[2]) === !0 ? (document.querySelector(r + ' [error = "' + a + '"]').innerHTML = "", e.statusArray.push("true")) : e.statusArray.push("false")
                    }
            if (-1 == e.statusArray.indexOf("false") ? e.status = !0 : e.status = !1, e.callback !== !1) e.callback();
            else if (e.autoSend === !0) {
                var s = document.getElementById(r.replace("#", "")),
                    l = s.action,
                    m = s.method,
                    c = s.enctype,
                    d = new XMLHttpRequest;
                d.open(m, l, e.asnyncSend), d.setRequestHeader("Content-Type", c), d.send(), d.onreadystatechange = function() {
                    if (4 == this.readyState)
                        if (4 == this.readyState && 200 == this.status) e.autoSendCallBack !== !1 && e.autoSendCallBack(this.responseText);
                        else if (4 == this.readyState && 200 != this.status) {
                        var r = [this.status, this.statusText];
                        e.autoSendCallBack(r)
                    }
                }
            }
        }
    }
}
Form.prototype.Validator = Object.create({
    required: function(e, r) {
        var t = document.querySelector(r + ' [name = "' + e + '"]').value.trim();
        return "" == t ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "The field is required", !1) : !0
    },
    min: function(e, r, t) {
        if (this.required.apply(this, arguments) === !0) {
            var n = document.querySelector(r + ' [name = "' + e + '"]').value;
            return n.length < t ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Min error", !1) : !0
        }
    },
    max: function(e, r, t) {
        if (this.required.apply(this, arguments) === !0) {
            var n = document.querySelector(r + ' [name = "' + e + '"]').value;
            return n.length > t ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Max error", !1) : !0
        }
    },
    between: function(e, r, t, n) {
        if (this.required.apply(this, arguments) === !0) {
            var a = document.querySelector(r + ' [name = "' + e + '"]').value,
                i = parseInt(a);
            if (isNaN(i) === !0) {
                var u = a.length;
                return u < parseInt(t) || u > parseInt(n) ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "between error", !1) : !0
            }
            return i < parseInt(t) || i > parseInt(n) ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "between error", !1) : !0
        }
    },
    min_size: function(e, r, t) {
        if (this.required.apply(this, arguments) === !0) {
            var n = document.querySelector(r + ' [name = "' + e + '"]').files[0].size;
            return t > n ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "min size error", !1) : !0
        }
    },
    max_size: function() {
        if (this.required.apply(this, arguments) === !0) {
            var e = document.querySelector(form + ' [name = "' + name + '"]').files[0].size;
            return e > value ? (document.querySelector(form + ' [error = "' + name + '"]').innerHTML = "min size error", !1) : !0
        }
    },
    alpha: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value;
            return /^[a-zA-Z]+$/.test(t.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Alpha error", !1) : !0
        }
    },
    alpha_numeric: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value;
            return /^[a-zA-Z0-9]+$/.test(t.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "AlphaNum error", !1) : !0
        }
    },
    alpha_spaces: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value;
            return /^[a-zA-Z\s\/]*$/.test(t.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "AlphaSpaces error", !1) : !0
        }
    },
    alpha_dashes: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value;
            if (/^[a-zA-Z-\/]*$/.test(t.trim()) !== !0) return document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "AlphaDashes error", !1
        }
    },
    numeric: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value;
            return /^[0-9]*$/.test(t.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Num error", !1) : !0
        }
    },
    numeric_spaces: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value;
            return /^[0-9\s\/]*$/.test(t.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "NumSpaces error", !1) : !0
        }
    },
    numeric_dashes: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value;
            return /^[0-9-]*$/.test(t.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "NumDashes error", !1) : !0
        }
    },
    regexp: function(e, r, t) {
        if (this.required.apply(this, arguments) === !0) {
            var n = document.querySelector(r + ' [name = "' + e + '"]').value,
                a = new Regexp(t);
            return a.test(n.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Regexp error", !1) : !0
        }
    },
    email: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value,
                n = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return n.test(t.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "NumDashes error", !1) : !0
        }
    },
    url: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value,
                n = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
            return n.test(t.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Url error", !1) : !0
        }
    },
    image: function(e, r) {
        var t = ["jpg", "jpeg", "png", "gif"];
        if (this.required.apply(this, arguments) === !0) {
            var n = document.querySelector(r + ' [name = "' + e + '"]').value;
            if ("file" != document.querySelector(r + ' [name = "' + e + '"]').type) return console.error("Please Check Your Input type"), !1;
            var a = n.split(".");
            return -1 == t.indexOf(a[a.length - 1]) ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Image error", !1) : !0
        }
    },
    min_img_w: function(e, r, t) {
        if (this.image.apply(this, arguments) === !1) return console.error("Please Check Your File Type"), !1;
        var n = this.image_load.apply(this, [e, r, "width"]);
        return t > n ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Min img width error", !1) : !0
    },
    max_img_w: function(e, r, t) {
        if (this.image.apply(this, arguments) === !1) return console.error("Please Check Your File Type"), !1;
        var n = this.image_load.apply(this, [e, r, "width"]);
        return n > t ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Min img width error", !1) : !0
    },
    img_w: function(e, r, t) {
        if (this.image.apply(this, arguments) === !1) return console.error("Please Check Your File Type"), !1;
        var n = this.image_load.apply(this, [e, r, "width"]);
        return n != t ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Min img width error", !1) : !0
    },
    min_img_h: function(e, r, t) {
        if (this.image.apply(this, arguments) === !1) return console.error("Please Check Your File Type"), !1;
        var n = this.image_load.apply(this, [e, r, "height"]);
        return t > n ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Min img width error", !1) : !0
    },
    max_img_h: function(e, r, t) {
        if (this.image.apply(this, arguments) === !1) return console.error("Please Check Your File Type"), !1;
        var n = this.image_load.apply(this, [e, r, "height"]);
        return n > t ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Min img width error", !1) : !0
    },
    img_h: function(e, r, t) {
        if (this.image.apply(this, arguments) === !1) return console.error("Please Check Your File Type"), !1;
        var n = this.image_load.apply(this, [e, r, "height"]);
        return n != t ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "Min img width error", !1) : !0
    },
    image_load: function(e, r, t) {
        var n = document.querySelector(r + ' [name = "' + e + '"]'),
            a = n.files && n.files[0];
        if (a) {
            var i = new Image;
            i.src = window.URL.createObjectURL(a), console.log(i.src), console.log(i), i.onload = function() {
                i.naturalWidth, i.naturalHeight;
                return "width" == t ? i.naturalWidth : i.naturalHeight
            }
        }
    },
    file_f: function(name, form, value) {
        var file = document.querySelector(form + ' [name = "' + name + '"]').files[0],
            format_available = eval(value);
        return "[object Array]" === Object.prototype.toString.call(format_available) ? -1 == format_available.indexOf(file.name.split(".").pop()) ? (document.querySelector(form + ' [error = "' + name + '"]').innerHTML = "File format error", !1) : !0 : void 0
    },
    date: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value,
                n = /(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/;
            if (n.test(t.trim()) !== !0) return document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "date error", !1
        }
    },
    time: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value,
                n = /([01]\d|2[0-3]):([0-5]\d)/;
            return n.test(t.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "time error", !1) : !0
        }
    },
    date_time: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]').value,
                n = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/;
            return n.test(t.trim()) !== !0 ? (document.querySelector(r + ' [error = "' + e + '"]').innerHTML = "date_time error", !1) : !0
        }
    },
    accepted: function(e, r) {
        if (this.required.apply(this, arguments) === !0) {
            var t = document.querySelector(r + ' [name = "' + e + '"]');
            return t.checked === !0 ? !0 : !1
        }
    },
    different: function(name, form, value) {
        var available = eval(value),
            val = document.querySelector(form + ' [name = "' + name + '"]').value;
        return available.indexOf(val) > -1 ? (document.querySelector(form + ' [error = "' + name + '"]').innerHTML = "different  error", !1) : !0
    },
    "in": function(name, form, value) {
        var available = eval(value),
            val = document.querySelector(form + ' [name = "' + name + '"]').value;
        return -1 == available.indexOf(val) ? (document.querySelector(form + ' [error = "' + name + '"]').innerHTML = "in error", !1) : !0
    }
});
var Form = new Form;