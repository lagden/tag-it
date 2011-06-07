(function($)
{
  // For debugging
  var trace = function(msg)
  {
    if(this.console && typeof console.log != "undefined")
    {
      console.log(msg);
    }
  };
  
  var tagNew="tagit-new";
  var tagInput="tagit-input";
  var tagChoice="tagit-choice";
  
  var TagIt = function(element, settings)
  {
    var _this=this;
    _this.options = $.extend({}, $.fn.tagit.defaults, settings);
    _this.el=$(element);
    
    const BACKSPACE=8;
    const ENTER=13;
    const SPACE=32;
    const COMMA=44;
    
    // add the tagit CSS class.
    _this.el.addClass("tagit");
    // create the input field.
    _this.el.html('<li class="'+tagNew+'"><input class="'+tagInput+'" type="text" /></li>');
    _this.tag_input=_this.el.children("."+tagNew).children("."+tagInput);
    _this.el.click(function(e)
    {
      if(e.target.tagName == 'A')
      {
        // Removes a tag when the little 'x' is clicked.
        // Event is binded to the UL, otherwise a new tag (LI > A) wouldn't have this event attached to it.
        $(e.target).parent().remove();
      }
      else
      {
        // Sets the focus() to the input field, if the user clicks anywhere inside the UL.
        // This is needed because the input field needs to be of a small size.
        _this.tag_input.focus();
      }
    });
    
    _this.tag_input.keypress(function(event)
    {
      if(event.which == BACKSPACE)
      {
        if (_this.tag_input.val() == "")
        {
          // When backspace is pressed, the last tag is deleted.
          _this.el.children("."+tagChoice+":last").remove();
        }
      }
      // Comma/Space/Enter are all valid delimiters for new tags.
      else if(event.which == COMMA || ( event.which == SPACE && !_this.options.acceptSpace ) || event.which == ENTER)
      {
        event.preventDefault();
        
        var typed=_this.tag_input.val();
        typed=typed.replace(/,+$/,"");
        typed=typed.trim();
        
        if(typed != "")
        {
          if(_this.is_new(typed)) _this.create_choice(typed);
          
          // Cleaning the input.
          _this.tag_input.val("");
        }
      }
    });
    
    _this.tag_input.autocomplete(
    {
      source: _this.options.availableTags, 
      select: function(event,ui)
      {
        if(_this.is_new(ui.item.value))
        {
          _this.create_choice(ui.item.value);
        }
        // Cleaning the input.
        _this.tag_input.val("");
        // Preventing the tag input to be update with the chosen value.
        return false;
      }
    });
    
    // Complete with tags
    $.each(_this.options.currentTags,function(idx,item){
      _this.create_choice(item);
    });
  };
  
  $.fn.tagit = function(settings)
  {
    return this.each(function()
    {
      var element=$(this);
      // Return early if this element already has a plugin instance
      if(element.data('tagit'))
      {
        return;
      }
      // Pass options to plugin constructor
      var tagit=new TagIt(this, settings);
      // Store plugin object in this element's data
      element.data('tagit', tagit);
    }); 
  };
  
  var $TagIt = TagIt;

  $TagIt.fn = $TagIt.prototype = {
      tagit: '0.5'
  };

  $TagIt.fn.extend = $TagIt.extend = $.extend;
  
  $TagIt.fn.extend(
  {
    is_new:function(value)
    {
      var is_new = true;
      this.tag_input.parents("ul").children("."+tagChoice).each(function(i)
      {
        n=$(this).children("input").val();
        if(value == n)
        {
          is_new = false;
        }
      });
      return is_new;
    },
    
    create_choice:function(value)
    {
      var nel='';
      nel='<li class="'+tagChoice+'">';
      nel+=value;
      nel+='<a class="close">\u00D7</a>';
      nel+='<input type="hidden" style="display:none;" value="'+value+'" name="'+this.options.field+'">';
      nel+='</li>';
      var li_search_tags=this.tag_input.parent();
      $(nel).insertBefore(li_search_tags);
      this.tag_input.val('');
    }
  });
  
  $.fn.tagit.defaults={
    "field":"item[tags][]",
    "availableTags":[],
    "currentTags":[],
    "acceptSpace":false
  };
  
  String.prototype.trim=function()
  {
    return this.replace(/^\s+|\s+$/g,"");
  };
  
})(jQuery);