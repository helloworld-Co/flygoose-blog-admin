<template>
  <div class="login-page">
    <h1 class="title">flygoose 博客管理系统</h1>
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      :labelCol="labelCol"
      labelAlign="right"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <a-input v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
          登陆
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { useUserStoreWithOut } from '@/stores/module/user'
import { defineComponent, reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import md5 from 'js-md5'
const userStore = useUserStoreWithOut()

interface FormState {
  username: string
  password: string
  remember: boolean
}
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    const formState = reactive<FormState>({
      username: '18050506630',
      password: '123456',
      remember: true
    })
    const onFinish = (values: any) => {
      userStore.loginAction({
        username: formState.username,
        password: md5(formState.password)
      })
      console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    const disabled = computed(() => {
      return !(formState.username && formState.password)
    })

    const labelCol = { style: { width: '80px' } }
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
      labelCol
    }
  }
})
</script>
<style lang="less">
.login-page {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/login-bg.svg');

  .title {
    position: relative;
    top: 35%;
    left: 50%;
    transform: translate(calc(-50% + 20px), calc(-50% - 60px));
    text-align: center;
  }

  .login-form {
    position: relative;
    top: 35%;
    left: 50%;
    max-width: 400px;
    transform: translate(-50%, -50%);

    .ant-form-item-control-input-content {
      .login-form-button {
        margin-left: 80px;
        width: calc(100% - 80px);
      }
    }
  }
}
</style>
