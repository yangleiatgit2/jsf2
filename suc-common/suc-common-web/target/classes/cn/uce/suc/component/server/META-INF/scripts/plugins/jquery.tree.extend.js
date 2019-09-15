/**
 * tree方法扩展
 */
$.extend($.fn.tree.methods, {
	/**
	 * 激活复选框
	 * @param {Object} jq
	 * @param {Object} target
	 */
	enableCheck : function(jq, target) { 
        return jq.each(function(){
            var realTarget;
            if(typeof target == "string" || typeof target == "number"){
                realTarget = $(this).tree("find",target).target;
            }else{
                realTarget = target;
            }
            var ckSpan = $(realTarget).find(">span.tree-checkbox");
            if(ckSpan.hasClass('tree-checkbox-disabled0')){
                ckSpan.removeClass('tree-checkbox-disabled0');
            }else if(ckSpan.hasClass('tree-checkbox-disabled1')){
                ckSpan.removeClass('tree-checkbox-disabled1');
            }else if(ckSpan.hasClass('tree-checkbox-disabled2')){
                ckSpan.removeClass('tree-checkbox-disabled2');
            }
        });
	},
	/**
	 * 禁用复选框
	 * @param {Object} jq
	 * @param {Object} target
	 */
	disableCheck : function(jq, target) {
		return jq.each(function() {
            var realTarget;
            var that = this;
            var state = $.data(this,'tree');
            var opts = state.options;
			if(typeof target == "string" || typeof target == "number"){
                realTarget = $(this).tree("find",target).target;
            }else{
                realTarget = target;
            }
			var next = $(realTarget).find("+ul");
            var ckSpan = $(next).find(".tree-checkbox");
            ckSpan.push($(realTarget).find(">span.tree-checkbox")[0]);
            var $thisNode = $(this).tree("find",target);
            //$thisNode.enabled = false;
            changeChildrenEnable(that,$thisNode);
            changeParentEnable(that,$thisNode,ckSpan);
            ckSpan.removeClass("tree-checkbox-disabled0").removeClass("tree-checkbox-disabled1").removeClass("tree-checkbox-disabled2");
            if(ckSpan.hasClass('tree-checkbox0')){
                ckSpan.addClass('tree-checkbox-disabled0');
            }else if(ckSpan.hasClass('tree-checkbox1')){
                ckSpan.addClass('tree-checkbox-disabled1');
            }else{
                ckSpan.addClass('tree-checkbox-disabled2')
            }

            if(!state.resetClick){
                $(this).unbind('click').bind('click', function(e) {
                    var tt = $(e.target);
                    var node = tt.closest('div.tree-node');
                    if (!node.length){return;}
                    if (tt.hasClass('tree-hit')){
                        $(this).tree("toggle",node[0]);
                        return false;
                    } else if (tt.hasClass('tree-checkbox')){
                        if(tt.hasClass('tree-checkbox-disabled0') || tt.hasClass('tree-checkbox-disabled1') || tt.hasClass('tree-checkbox-disabled2')){
                            $(this).tree("select",node[0]);
                        }else{
                            if(tt.hasClass('tree-checkbox1')){
                                $(this).tree('uncheck',node[0]);
                            }else{
                                $(this).tree('check',node[0]);
                            }
                            return false;
                        }
                    } else {
                        $(this).tree("select",node[0]);
                        opts.onClick.call(this, $(this).tree("getNode",node[0]));
                    }
                    e.stopPropagation();
                });
            }
            
		});
	}
});

function changeChildrenEnable(that,$thisNode){
	var children = $thisNode.children;
	if(null != children){
		$(that).tree("find",$thisNode.id).enabled = false;
		for(var i = 0; i< children.length; i++){
			changeChildrenEnable(that,children[i]);
		}
	}else{
		$(that).tree("find",$thisNode.id).enabled = false;
	}
}

function changeParentEnable(that,$thisNode,ckSpan){
	var parent = $(that).tree("getParent",$thisNode.target);
	if(null != parent){
		var childrenNodes = parent.children;
		var enableNodes = where(childrenNodes, {"enabled":false});
		if(parent.enabled && childrenNodes.length == enableNodes.length){
			var parent = $(that).tree("find",parent.id);
			parent.enabled = false;
			var target = parent.target;
			ckSpan.push($(target).find(">span.tree-checkbox")[0]);
			if(parent.areaType != 1){
				changeParentEnable(that,parent,ckSpan);
			}
		}
	}
}