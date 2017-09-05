/**
 * Created by jiangsong on 2017/9/4.
 */


global.ONE_DROP_ENV = 'local_test';
// global.ONE_DROP_ENV = 'remote_test';
// global.ONE_DROP_ENV = 'production';

module.exports = {
    FilePath:ONE_DROP_ENV === 'local_test' ? '/vartest/dropresources/resources' : '/var/dropresources/resources',
    ResBaseUrl : ONE_DROP_ENV === 'local_test' ? 'http://localhost:3301' : ONE_DROP_ENV === 'remote_test' ? 'http://leader.cvwisdom.com' : 'http://drop.cvwisdom.com',
}