'use strict';

module.exports = function(app) {
    // inject:start
    require('./comment.service')(app);
    require('./core-data.service')(app);
    require('./ds-comment.service')(app);
    require('./ds-post.service')(app);
    require('./placeholders.service')(app);
    require('./post.service')(app);
    // inject:end
};
