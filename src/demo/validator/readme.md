# validator

> 配置项合法校验模块，如果校验不过会抛出异常

## Usage

```javascript
import validator from './index.js';
```

## API Reference

### validator.check(config) API signature

* parameter

  name|type|required|default|description
  -|-|-|-|-
  config|Object|yes||整个页面模板配置数据

### validator.checkFilter(config) API signature

* parameter

  name|type|required|default|description
  -|-|-|-|-
  config|Object|yes||单独的筛选条件组件的配置项数据

### validator.checkAction(config) API signature

* parameter

  name|type|required|default|description
  -|-|-|-|-
  config|Object|yes||单独的通用操作配置项数据

### validator.checkSearch(config) API signature

* parameter

  name|type|required|default|description
  -|-|-|-|-
  config|Object|yes||搜索操作配置项

### validator.checkField(config) API signature

* parameter

  name|type|required|default|description
  -|-|-|-|-
  config|Object|yes||单独的数据绑定组件配置项数据

