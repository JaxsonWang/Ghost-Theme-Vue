module.exports = {
  index: '' +
    '<header>\n' +
    '  <h1 class="page-title">{{@blog.title}}</h1>\n' +
    '  <h2 class="page-description">{{@blog.description}}</h2>\n' +
    '</header>\n' +
    '\n' +
    '<main role="main">\n' +
    '<!-- This is the post loop - each post will be output using this markup -->\n' +
    '  {{#foreach posts}}\n' +
    '\t<article class="{{post_class}}">\n' +
    ' \t\t<header class="post-header">\n' +
    '   \t\t<h2><a href="{{url}}">{{title}}</a></h2>\n' +
    '    </header>\n' +
    '    <section class="post-excerpt">\n' +
    ' \t\t\t<p>{{excerpt words="44"}} <a class="read-more" href="{{url}}">...</a></p>\n' +
    '    </section>\n' +
    '    <footer class="post-meta">\n' +
    '      {{#if primary_author.profile_image}}<img src="{{primary_author.profile_image}}" alt="Author image" />{{/if}}\n' +
    '      {{primary_author}}\n' +
    '      {{tags prefix=" on "}}\n' +
    '      <time class="post-date" datetime="{{date format=\'YYYY-MM-DD\'}}">{{date format="DD MMMM YYYY"}}</time>\n' +
    '    </footer>\n' +
    '  </article>\n' +
    '  {{/foreach}}\n' +
    '\n' +
    '</main>\n' +
    '\n' +
    '<!-- Previous/next page links - displayed on every page -->\n' +
    '{{pagination}}',
  post: '' +
    '{{#post}}\n' +
    '    <img src="{{img_url feature_image size=\'xl\'}}" alt="article image"/>' +
    '    <div class="container">\n' +
    '        <div class="hero-content">\n' +
    '            <h1 class="post-full-title">{{title}}</h1>\n' +
    '            <section class="post-full-meta">\n' +
    '                {{#primary_tag}}\n' +
    '                    <span class="date-divider">/</span>\n' +
    '                    <a href="{{url}}">{{name}}</a>\n' +
    '                {{/primary_tag}}\n' +
    '            </section>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    </section>\n' +
    '    {{!-- Everything inside the #post tags pulls data from the post --}}\n' +
    '    <main class="site-main container">\n' +
    '        <div class="inner row">\n' +
    '            <article>\n' +
    '                <section class="post-content">\n' +
    '                    {{content}}\n' +
    '                </section>\n' +
    '            </article>\n' +
    '        </div>\n' +
    '    </main>\n' +
    '\n' +
    '{{/post}}'
}
