<template>
    <main class="form-signin w-100 m-auto">
        <transition name="fade" appear>
            <form class="form-signin" @submit.prevent="submitForm">
                <div class="text-center mb-4">
                    <h1 class="h1 mb-3 text-md font-weight-normal">Logowanie</h1>
                </div>
                <div class="form-label-group">
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address"
                        v-model="emailInput" required autofocus>
                    <label for="inputEmail">Email</label>
                </div>
                <div class="form-label-group">
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password"
                        v-model="passwordInput" required>
                    <label for="inputPassword">Hasło</label>
                    <span v-if="isLoginError" class="text-danger font-weight-bold ml-1">Błędne dane</span>
                </div>
                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" v-model="isRemembered" value="remember-me"> Zapamiętaj mnie
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Zaloguj się</button>
            </form>
        </transition>
    </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import jsonData from '../assets/user.login.datas.json'
import UserLoginDatas from '../types/UserLoginDatas'
import { useLogin } from '../stores/loging'

export default defineComponent({
    setup() {
        const data = {
            isRemembered: ref(false),
            isLoginError: ref(false),
            emailInput: ref(''),
            passwordInput: ref(''),
            registeredUsers: ref<UserLoginDatas[]>([]),
        };

        const router = useRouter();
        const loginStore = useLogin();
        const { isRemembered, isLoginError, emailInput, passwordInput, registeredUsers } = toRefs(data);

        onMounted(() => {
            registeredUsers.value = jsonData
        })

        const submitForm = (): void => {
            if (validateUser()) {
                if (isRemembered.value) {
                    loginStore.setRememberUser();
                }
                loginStore.loginUser();
                router.push({ name: "weather" });
            }
            else {
                isLoginError.value = true;
            }
        };

        const validateUser = (): boolean => {
            return registeredUsers.value.some((userData) => {
                return userData.email === emailInput.value && userData.password === passwordInput.value;
            });
        };

        return {
            ...data,
            submitForm,
            validateUser,
        };
    }
})
</script>

<style scoped lang="scss">
@import "../GeneralStyles/variables";

main {
    @include SquareSize(100%);
    @include FlexCenter;
    background-image: url("../../public/sky-background.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .fade-enter-to {
        animation: fadeIn 2s forwards;
    }

    form {
        width: 15%;
        min-width: 200px;
        font-family: $PTSans;

        .form-label-group {
            position: relative;
            margin-bottom: 1rem;

            input {
                height: auto;
                padding: 10px;
                font-size: 16px;

                &::-webkit-input-placeholder {
                    color: transparent;
                }

                &:-ms-input-placeholder {
                    color: transparent;
                }

                &::-moz-placeholder {
                    color: transparent;
                }

                &:not(:placeholder-shown) {
                    padding-top: 1.25rem;
                    padding-bottom: 0.25rem;

                    ~label {
                        padding-top: 0.25rem;
                        padding-bottom: 0.25rem;
                        font-size: 12px;
                        color: #777;
                    }
                }
            }

            >label {
                width: 100%;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                margin-bottom: 0;
                padding: 10px;
                line-height: 1.5;
                background-color: transparent;
                color: #495057;
                border: 1px solid transparent;
                border-radius: .25rem;
                pointer-events: none;
                cursor: text;
                transition: all .1s ease-in-out;
            }

            >input,
            >label {
                height: auto;
                padding: 10px;
                border-radius: 4px;
            }
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(-20vh);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>