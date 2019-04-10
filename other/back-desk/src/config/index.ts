import dev from './dev.env';
import prod from './prod.env';

export default {
  API_ROOT: process.env.NODE_ENV === 'development'
    ? dev.API_ROOT
    : prod.API_ROOT,
  API_OSS_ROOT: process.env.NODE_ENV === 'development'
    ? dev.API_OSS_ROOT
    : prod.API_OSS_ROOT,
  TINYMCE_PLUGINS: process.env.NODE_ENV === 'development'
    ? dev.TINYMCE_PLUGINS
    : prod.TINYMCE_PLUGINS,
  TINYMCE_TOOLBAR: process.env.NODE_ENV === 'development'
    ? dev.TINYMCE_TOOLBAR
    : prod.TINYMCE_TOOLBAR
};
