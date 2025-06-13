import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  //можно вывести в отдельный файл эту функцию чтобы код ui был чище
  const className: NavLinkProps['className'] = ({ isActive }) =>
    isActive ? `${styles.link_active} ${styles.link}` : styles.link;

  return (
    <>
      <header className={styles.header}>
        <nav className={`${styles.menu} p-4`}>
          <div className={styles.menu_part_left}>
            <NavLink to={'/'} className={className}>
              <BurgerIcon type={'primary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </NavLink>
            <NavLink to={'/feed'} className={className}>
              <ListIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </NavLink>
          </div>
          <NavLink to={'/'} className={styles.logo}>
            <Logo className='' />
          </NavLink>
          <NavLink to={'/profile'} className={className}>
            <div className={styles.link_position_last}>
              <ProfileIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </div>
          </NavLink>
        </nav>
      </header>
    </>
  );
};
