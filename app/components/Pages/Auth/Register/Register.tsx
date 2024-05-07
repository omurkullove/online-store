import FormField from '@/app/elements/FormField/FormField';
import styles from './Register.module.scss';
import { FormEvent, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import authService from '@/app/services/authService';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { IRegister } from '@/interfaces/IAuth';
import { MESSAGES, SUCCESS_STATUS } from '@/app/utils/consts';

const Register = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [passwordConfType, setPasswordConfType] = useState('password');
    const [currentStep, setCurrentStep] = useState<'register' | 'pre-register'>('pre-register');
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const t = useTranslations('Register');
    const message = useTranslations('Messages');

    const handleGetCode = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const code = await authService.getConfirmCode(data?.email as string);

        if (code === SUCCESS_STATUS) {
            toast.success(`${MESSAGES.success.get_register_code + data.email}.`);
            setCurrentStep('register');
        } else {
            toast.error(message(code));
        }
        setIsLoading(false);
    };

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries()) as unknown as IRegister;

        if (data.password !== data.password_confirm) {
            toast.error(t('message_pass_conf'));
            setIsLoading(false);
            return;
        }

        const res = await authService.register(data);
        toast.success(res);
        setCurrentStep('register');
        setIsLoading(false);
    };

    return (
        <article className={styles.container}>
            <div className={styles.block}>
                <h1>{t('title')}</h1>

                {currentStep === 'pre-register' ? (
                    <form onSubmit={handleGetCode}>
                        <div className={styles.input_group}>
                            <FormField
                                className={styles.input}
                                name='email'
                                placeholder={t('email')}
                                required={true}
                                type='email'
                            />
                        </div>
                        <div className={styles.footer}>
                            <button
                                type='button'
                                onClick={() => push('/auth/login')}
                            >
                                {t('login')}
                            </button>
                            <button type='submit'>
                                <ImSpinner2
                                    style={{ display: isLoading ? 'block' : 'none' }}
                                    className={styles.loading}
                                />
                                {t('get_code')}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <div className={styles.input_group}>
                            <FormField
                                className={styles.input}
                                name='email'
                                placeholder={t('email')}
                                required={true}
                                type='email'
                            />
                            <FormField
                                className={styles.input}
                                name='first_name'
                                placeholder={t('name')}
                                required={true}
                            />
                            <FormField
                                className={styles.input}
                                name='display_name'
                                placeholder={t('username')}
                                required={true}
                            />
                            <FormField
                                className={styles.input}
                                name='code'
                                placeholder={t('verification_code')}
                                required={true}
                            />
                            <div className={styles.password}>
                                <FormField
                                    className={styles.input}
                                    name='password'
                                    placeholder={t('password')}
                                    required={true}
                                    type={passwordType}
                                />
                                {passwordType === 'password' ? (
                                    <IoEyeOffOutline
                                        className={styles.eye}
                                        onClick={() => setPasswordType('string')}
                                    />
                                ) : (
                                    <IoEyeOutline
                                        className={styles.eye}
                                        onClick={() => setPasswordType('password')}
                                    />
                                )}
                            </div>
                            <div className={styles.password}>
                                <FormField
                                    className={styles.input}
                                    name='password_confirm'
                                    placeholder={t('password_confirm')}
                                    required={true}
                                    type={passwordConfType}
                                />
                                {passwordConfType === 'password' ? (
                                    <IoEyeOffOutline
                                        className={styles.eye}
                                        onClick={() => setPasswordConfType('string')}
                                    />
                                ) : (
                                    <IoEyeOutline
                                        className={styles.eye}
                                        onClick={() => setPasswordConfType('password')}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <button
                                type='button'
                                onClick={() => setCurrentStep('pre-register')}
                            >
                                {t('back')}
                            </button>
                            <button type='submit'>
                                <ImSpinner2
                                    style={{ display: isLoading ? 'block' : 'none' }}
                                    className={styles.loading}
                                />
                                {t('register')}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </article>
    );
};

export default Register;
