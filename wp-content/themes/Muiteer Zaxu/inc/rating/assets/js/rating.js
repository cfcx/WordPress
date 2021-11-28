jQuery(document).ready(function($){
	$(document).on('click', '.button:not(.disabled)', function() {
		var postId = $(this).data("post-id"),
			postType = $(this).data('type'),
			count = $(this).find(".badge").text(),
			itemName = "thumbsrating" + postId;
		if ( !localStorage.getItem("thumbsrating" + postId + "-1") || !localStorage.getItem("thumbsrating" + postId + "-2") ){
			localStorage.setItem(itemName, true);
			var typeItemName = "thumbsrating" + postId + "-" + postType;
			localStorage.setItem(typeItemName, true);
			var data = {
				action: 'thumbs_rating_add_vote',
				postid: postId,
				type: postType,
				nonce: thumbs_rating_ajax.nonce
			};
			if (postType == "1") {
				$(".rating-like").addClass("disabled");
				$(".rating-like .badge").text(parseInt(count) + 1);
			}
			if(postType == "2") {
				$(".rating-dislike").addClass("disabled");
				$(".rating-dislike .badge").text(parseInt(count) + 1);
			}
			$.post(
				thumbs_rating_ajax.ajax_url,
				data,
				function(response) {
				}
			);
		};
	});
});