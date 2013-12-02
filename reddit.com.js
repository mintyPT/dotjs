
$('span.rank').hide();
$('div.nub').hide();
$('div.goldvertisement').hide();
$('div.thing').css({
    'padding-bottom': '10px',
})


activityLink = $('<a id="mint" href="https://ssl.reddit.com/account-activity">activity<a/>');
activityLink.css({
    'padding': "0 2px",
})
$('span.user').after(activityLink);
$('div.account-activity-box').hide();


// $('div.nub').css({
//     'border': '1px solid red',
// })