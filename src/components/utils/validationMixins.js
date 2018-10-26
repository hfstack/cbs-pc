export default {
  methods: {
    /**
     * 当前字段是否有错误
     *
     * @param {String} fieldName 字段名
     * @param {String} validatorName 验证容器名
     */
    hasValidationError: function(fieldName, validatorName, hasSubmited) {
      var field = this['$' + validatorName][fieldName];
      return field && (field.dirty || hasSubmited) && (field.errors && field.errors.length !== 0);
    },

    /**
     * 获取该字段的第一个错误消息
     *
     * @param {String} fieldName 字段名
     * @param {String} validatorName 验证容器名
     */
    firstValidationMessage: function(fieldName, validatorName) {
      var field = this['$' + validatorName][fieldName];
      return field.errors && field.errors[0].message;
    }
  }
};
