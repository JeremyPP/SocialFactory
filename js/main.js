angular

.module('sfApp', ['ngMaterial', 'ngMessages', 'mdPickers'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('amber');
})


//======= Main Toolbar Controller =======//

.controller('ToolbarCtrl', function ($scope, $timeout, $mdSidenav) {
	$scope.toggleLeft = buildDelayedToggler('leftNavbar');
	
    // Supplies a function that will continue to operate until the time is up.
    function debounce(func, wait, context) {
		var timer;
		return function debounced() {
			var context = $scope,
			args = Array.prototype.slice.call(arguments);
			$timeout.cancel(timer);
			timer = $timeout(function() {
				timer = undefined;
				func.apply(context, args);
			}, wait || 10);
		};
    }
	
	// Build handler to open/close a SideNav.
    function buildDelayedToggler(navID) {
		return debounce(function() {

			// Component lookup should always be available since we are not using ng-if.
			$mdSidenav(navID)
			.toggle()
		}, 20);
	};
	
})


//======= Left Navbar Controller =======//

.controller('LeftNavbarCtrl', function ($scope) {
	
})


//======= Calendar page Main Container Controller =======//

.controller('mainCalendarCtrl', function($scope, $mdDialog) {
	
	$scope.data = {};
	$scope.data.cb1 = true;
	$scope.data.cb2 = true;
	$scope.data.cb3 = true;

	// Modal trigger
	$scope.showPrerenderedDialog = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			contentElement: '#myDialogFace',
			targetEvent: ev,
			clickOutsideToClose: true
		});
	};
})


//======= Settings page Main Controller =======//

.controller('mainSettingsCtrl', function($scope, $mdDialog) {
	
	// Modal trigger
	$scope.showPrerenderedDialog = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			contentElement: '#myDialogDelAccount',
			targetEvent: ev,
			clickOutsideToClose: true
		});
	};
	
	// Modal trigger 2
	$scope.showPrerenderedDialog2 = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			contentElement: '#myDialogAddAccount',
			targetEvent: ev,
			clickOutsideToClose: true
		});
	};
	
	$scope.user = {
		title: 'Jonathan Ive official',
		username: '@jonathanive',
		password: '',
	};
	
	$scope.account = {
		title: '',
		username: '',
		password: '',
	};
	
	$scope.hide = function() {
		$mdDialog.hide();
	};

})


//=======  Account Config page Main Controller =======//

.controller('accountConfigCtrl', function($scope, $mdDialog) {
	
	$scope.api = {
		key1: '0jG4xjFXTdrDqmRbIPau0v1DZnjdpNQ4Lu07qqg',
		key2: 'd41d8cd98f00b204e900998ecf8427eau0v145u',
		key3: '2e7bd3eb60233174aa0b0532a4xjFXTya8447f2',
		token1: 'ef3031.87fc8d41668f25199c2.98396a5',
	};

})


//======= Publisher page Main Controller =======//

.controller("mainPublisherCtrl", function($scope, $mdDialog, $mdpDatePicker, $mdpTimePicker) {

	
	// Modal trigger
	$scope.showPrerenderedDialog = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			contentElement: '#myDialogFace',
			targetEvent: ev,
			clickOutsideToClose: true
		});
	};
	
	$scope.hide = function() {
		$mdDialog.hide();
	};
	
	$scope.content = {
		url: 'https://mywebsite.com/mycontent',
		customDescription: 'Some amazing content title',
	};
	
	
	// https://github.com/logbon72/angular-material-datetimepicker
	//$scope.currentDate = new Date();
	
	this.showDatePicker = function(ev) {
		$mdpDatePicker($scope.currentDate, {
			targetEvent: ev
		}).then(function(selectedDate) {
			$scope.currentDate = selectedDate;
		})
	}

	this.showTimePicker = function(ev) {
		$mdpTimePicker($scope.currentTime, {
			targetEvent: ev
		}).then(function(selectedDate) {
			$scope.currentTime = selectedDate;
		})
	}

})


// Dialog modal trigger function
function DialogController($scope, $mdDialog) {

}



//======= jQuery functions =======//



// Remove Input Type on date and time picker (Content Manager page)

function removeTypePicker() {
	$("mdp-date-picker input.md-input, mdp-time-picker input.md-input").removeAttr( "type" );
};


// Filter content cards

    $(".searchFieldInput").keyup(function(){
 
        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val(), count = 0;
 
        // Loop through the content list
        $(".contentCardContainer md-card").each(function(){
 
            // If the list item does not contain the text phrase hide it
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
 
            // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
                count++;
            }
        });
    });

	
// Add shadow to fixed toolbar on scroll (Content Manager Page)
$(window).scroll(function(){
	if ($("body").scrollTop() >= 64) {
		$(".fixedHeaderShadowFix").css("box-shadow", "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)");
	} else {
		$(".fixedHeaderShadowFix").css("box-shadow", "none");
	}
});
	
	
// Modal pagination

// Page 1 to page 2
$(".pageStepperOneControls").on("click", "#pageOneToPageTwo", function(){
	$(".stepOneContentContainer").hide();
	$(".stepTwoContentContainer").show();
	$(".stepOneContainer").removeClass("stepActive");
	$(".stepTwoContainer").addClass("stepActive");
	
	// add class if step is completed
	$(".stepOneContainer").addClass("stepCompleted");
	$(".stepOneContainer .stepNumber").hide();
	$(".stepOneContainer .stepNumberComplete").show();
}); 

// Page 2 to page 1
$(".pageStepperTwoControls").on("click", "#pageTwoToPageOne", function(){
	$(".stepTwoContentContainer").hide();
	$(".stepOneContentContainer").show();
	$(".stepTwoContainer").removeClass("stepActive");
	$(".stepOneContainer").addClass("stepActive");
}); 

// Page 2 to page 3
$(".pageStepperTwoControls").on("click", "#pageTwoToPageThree", function(){
	$(".stepTwoContentContainer").hide();
	$(".stepThreeContentContainer").show();
	$(".stepTwoContainer").removeClass("stepActive");
	$(".stepThreeContainer").addClass("stepActive");
	
	// add class if step is completed
	$(".stepTwoContainer").addClass("stepCompleted");
	$(".stepTwoContainer .stepNumber").hide();
	$(".stepTwoContainer .stepNumberComplete").show();
}); 

// Page 3 to page 2
$(".pageStepperThreeControls").on("click", "#pageThreeToPageTwo", function(){
	$(".stepThreeContentContainer").hide();
	$(".stepTwoContentContainer").show();
	$(".stepThreeContainer").removeClass("stepActive");
	$(".stepTwoContainer").addClass("stepActive");
}); 


// Select Social Media

$('.socialSelect').click(function(){
     $('.socialSelect').not(this).each(function(){
         $(this).addClass("socialSelectFaded");
     });
	 $(this).removeClass("socialSelectFaded");
})


	
//======= Content Manager TABS =======//

// Intial Border Position
var activePos = $('.tabs-header .active').position();

// Change Position
function changePos() {

  // Up<a href="http://www.jqueryscript.net/time-clock/">date</a> Position
  activePos = $('.tabs-header .active').position();

  // Change Position & Width
  $('.border').stop().css({
    left: activePos.left,
    width: $('.tabs-header .active').width()
  });
}

changePos();

// Intial Tab Height
var tabHeight = $('.tab.active').height();

// Animate Tab Height
function animateTabHeight() {

  // Update Tab Height
  tabHeight = $('.tab.active').height();

  // Animate Height
  $('.tabs-content').stop().css({
    height: tabHeight + 'px'
  });
}

animateTabHeight();

// Change Tab
function changeTab() {
  var getTabId = $('.tabs-header .active a').attr('tab-id');

  // Remove Active State
  $('.tab').stop().fadeOut(300, function () {
    // Remove Class
    $(this).removeClass('active');
  }).hide();

  $('.tab[tab-id=' + getTabId + ']').stop().fadeIn(300, function () {
    // Add Class
    $(this).addClass('active');

    // Animate Height
    animateTabHeight();
  });
}

// Tabs
$('.tabs-header a').on('click', function (e) {
  e.preventDefault();

  // Tab Id
  var tabId = $(this).attr('tab-id');

  // Remove Active State
  $('.tabs-header a').stop().parent().removeClass('active');

  // Add Active State
  $(this).stop().parent().addClass('active');

  changePos();

  // Update Current Itm
  tabCurrentItem = tabItems.filter('.active');

  // Remove Active State
  $('.tab').stop().fadeOut(300, function () {
    // Remove Class
    $(this).removeClass('active');
  }).hide();

  // Add Active State
  $('.tab[tab-id="' + tabId + '"]').stop().fadeIn(300, function () {
    // Add Class
    $(this).addClass('active');

    // Animate Height
    animateTabHeight();
  });
});

// Tab Items
var tabItems = $('.tabs-header ul li');

// Tab Current Item
var tabCurrentItem = tabItems.filter('.active');


// Tabs ripple efect
$('[ripple]').on('click', function (e) {
  var rippleDiv = $('<div class="ripple" />'),
    rippleOffset = $(this).offset(),
    rippleY = e.pageY - rippleOffset.top,
    rippleX = e.pageX - rippleOffset.left,
    ripple = $('.ripple');

  rippleDiv.css({
    top: rippleY - (ripple.height() / 2),
    left: rippleX - (ripple.width() / 2),
    background: $(this).attr("ripple-color")
  }).appendTo($(this));

  window.setTimeout(function () {
    rippleDiv.remove();
  }, 1500);
});



//======= Toggle Search options =======//

function moreSearchOptions() {
	if (!($(".searchFieldWrapper .md-icon-button md-icon").hasClass("rotateButArrow"))){
		$(".searchFieldWrapper .md-icon-button md-icon").addClass("rotateButArrow");
		$(".searchFieldInput").css("border-bottom", "1px solid #eee");
		$(".searchFieldWrapper").css("height", "104");
		$(".moreSearchOptionsContainer").delay(200).fadeIn(50);
	} else {
		$(".searchFieldWrapper .md-icon-button md-icon").removeClass("rotateButArrow");
		$(".searchFieldInput").css("border-bottom", "0px solid #eee");
		$(".searchFieldWrapper").css("height", "43");
		$(".moreSearchOptionsContainer").hide();
	}
}


//======= Toggle Calendar views =======//

// Day
function toggleToDayView() {
	
	// hidde month and week view
	$(".calendarMonthGridContainer, .calendarWeekGridContainer").hide();
		
	// remove active class
	$(".layoutSelectorItem").removeClass("layoutActive");

	// add class on day
	$(".dayLayoutSelector").addClass("layoutActive");
	
	// show day view
	$(".calendarDayGridContainer").show();
	
}

// Week
function toggleToWeekView() {
	
	// hidde day and month view
	$(".calendarDayGridContainer, .calendarMonthGridContainer").hide();
	
	// remove active class
	$(".layoutSelectorItem").removeClass("layoutActive");

	// add class on week
	$(".weekLayoutSelector").addClass("layoutActive");
	
	// show week view
	$(".calendarWeekGridContainer").show();
	
}

// Month
function toggleToMonthView() {
	
	// hidde day and week view
	$(".calendarDayGridContainer, .calendarWeekGridContainer").hide();
		
	// remove active class
	$(".layoutSelectorItem").removeClass("layoutActive");

	// add class on month
	$(".monthLayoutSelector").addClass("layoutActive");
	
	// show month view
	$(".calendarMonthGridContainer").show();
	
}


//======= Settings Page JS functions =======//

// NEED BETTER INPLEMENTATION!!!
function editAccountInfo() {
	$(".accountDisp.toBeEdited .accountImgs, .accountDisp.toBeEdited .accountNames, .accountDisp.toBeEdited .accountActionsContainer").hide();
	$(".accountDisp.toBeEdited").css("height", "148px");
	$(".accountDisp.toBeEdited .accountColorBar").css("height", "138px");
	$(".accountEditContainer").fadeIn();
	$(".addNewTwitterAccountBtn").hide();
	$(".addNewTwitterAccountBtnDisabled").fadeIn();
}
function closeEditAccount() {
	$(".accountDisp.toBeEdited .accountImgs, .accountDisp.toBeEdited .accountNames, .accountDisp.toBeEdited .accountActionsContainer").fadeIn();
	$(".accountDisp.toBeEdited").css("height", "72px");
	$(".accountDisp.toBeEdited .accountColorBar").css("height", "62px");
	$(".accountEditContainer").hide();
	$(".addNewTwitterAccountBtn").show();
	$(".addNewTwitterAccountBtnDisabled").hide();
};


//======= FUNCTION CALLS =======//

// on page load
$(document).ready(function(){ 

	removeTypePicker();
	
});