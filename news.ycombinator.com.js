// Mauro Santos




// will store the references of the <tr> elements of the posts + each url
var post_dic = {};

// Colors for the rows
var colors = ['#f6f6ef', '#fcdece'];

// Color for the rows of an author's post
var color_row_author = "#c9d9c0";


// Color for my rows
var color_row_me = "#a9d3d6";

// Users to track and respective color
var users_to_track = ['pg', 'patio11'];
var color_row_tracked_users = '#dcc4f0';



// Mark an item as read with its reference
function mark_item(ref){
    set(post_dic[ref], true)
    $('.'+ref).hide()
}

// localStorage helper functions: set and get
function set(key, value){
    localStorage.setItem(key, value);
} 

function get(key){
    return localStorage.getItem(key)
}

// Convert an xpath to a css selector
function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }
    return xnodes;
}



$(document).ready(function(){


    var top = $($('tr')[0]);
    var my_username = undefined;
    if(top.text().indexOf('logout') != -1){
        my_username = top.find('a');

        my_username = my_username.filter(function(i, el){
            if(el['href'].indexOf('user?id=') != -1)
                return true
        })
        
        my_username.after(' | <a href="https://news.ycombinator.com/saved?id='+ my_username.text() +'">saved</a> | ')
                   .after(' | <a href="https://news.ycombinator.com/threads?id='+ my_username.text() +'">comments</a>')
                   .after(' | <a href="https://news.ycombinator.com/submitted?id='+ my_username.text() +'">submissions</a>');

        // my_username = my_username.text(); //[0]['href'].replace('https://news.ycombinator.com/user?id=', '');
        my_username = my_username[0]['href'].replace('https://news.ycombinator.com/user?id=', '');
    }


        

    // 
    // MAIN PAGE
    // 
    if((document.URL.indexOf('news.ycombinator.com/news') != -1) || 
        (document.URL.indexOf('news.ycombinator.com/newest') != -1) ||
        (document.URL.indexOf('https://news.ycombinator.com/x?fnid=') != -1)) {
        
        // Extends the rows to 100% of the page
        $(_x('/html/body/center/table/tbody/tr[3]/td/table')).css({
            width: '100%'
        })

        // Storage for the url out of the loop
        var url = '' 
        // To count the elements
        var counter = 0 
        
        // Selector
        var post_list_body = $(_x('/html/body/center/table/tbody/tr[3]/td/table'));

        post_list_body.find('tr').each(function(i, el){
            
            // reference attributed to the rows
            var ref = 'item_' + counter;
            // class adding + formating            
            var $el = $(el).addClass('item_'+counter)
                           .css({ background: colors[counter%2] });
            // url keeping
            if (url !== '' && url !== undefined && counter<=29)
                post_dic[ref] = url;

            // Due to the structure of the page,
            // each post has 3 <tr> but only two
            // are needed to make this work
            var type_of_row = i%3;

            if(type_of_row == 0){
                url = $($el.find('a')[1]).attr('href');
                var mark = $('<a href="#">X</a>')
                                .attr({
                                    'id': ref, 
                                    class: 'marker' })
                                .click(function(event, el){
                                        var ref = $(this).attr('id');
                                        mark_item(ref); })
                                .css({
                                    'font-weight': 'bold',
                                    'padding-right': '5px',
                                    'color': '#fa4f0f' });

                $($el.find('a')[1]).before(mark)
            }

            if(type_of_row == 2)
                counter++;

        })
        
        
        // mark all as read link
        var all_as_read = $('<a id="all_as_read" href="#">Mark all as read</a>')
                                .click(function(){
                                    for(var ref in post_dic)
                                        mark_item(ref);
                                })
        // show all link
        var show_all = $('<a id="show_all" href="#">Show all</a>')
                            .click(function(){
                                for(var ref in post_dic)
                                    $('.'+ref).show();
                            })

        // clear markers link
        var clear_localstorage = $('<a id="clear_localstorage" href="#">Clear markers</a>')
                                            .click(function(){
                                                localStorage.clear();
                                                for(var ref in post_dic)
                                                    $('.'+ref).show();
                                            })
        // 'more' link
        var more = $($('.'+'item_30')[1]);
        var more_link = $(more.find('td a')[0]);

        var links_div = $('<div id="link_bottom"></div>')
                            .css({ 'font-size': '11px',
                                   'padding': '20px 0px' })
                            .append(more_link)
                            .append(' | ')
                            .append(all_as_read)
                            .append(' | ')
                            .append(show_all)
                            .append(' | ')
                            .append(clear_localstorage)
        
        more.empty()
            .append('<td colspan="2"></td>')
            .append(links_div)
        
        $('#link_bottom a').css({ 'color': 'black',
                                  'font-weight': 'bold' })
        
        // to hide posts already marked
        for(var ref in post_dic)
            if(get(post_dic[ref]) !== null)
                $('.'+ref).hide();
    }



    

    // 
    // POST PAGE
    // 
    if(document.URL.indexOf('https://news.ycombinator.com/item?id=') != -1) {

        // Username of the author of the psot
        var username = $(_x('/html/body/center/table/tbody/tr[3]/td/table[1]/tbody/tr[2]/td[2]/a[1]')).text();

        // To alternate the color of the rows
        var color_index = 0;

        // Selector
        var comments_body = $(_x('/html/body/center/table/tbody/tr[3]/td/table[2]')).find('tr');
        comments_body.each(function(i, el){
            if (i%2 == 0)
                color_index++
            
            if(color_index%2==1)
                $(el).css({ background: colors[color_index%2] })
            
            // the rows belonging to the author of the post will have a specific background color
            var row_owner = $(el).find('a')[1].text;
            if( row_owner == username)
                $(el).css({ background: color_row_author })

            // the rows belonging to me will have a specific background color
            if(row_owner == my_username)
                $(el).css({ background: color_row_me })

            // the rows belonging to trakced users will have a specific background color
            if(users_to_track.indexOf(row_owner) != -1)
                $(el).css({ background: color_row_tracked_users })

        })

    }


    
})