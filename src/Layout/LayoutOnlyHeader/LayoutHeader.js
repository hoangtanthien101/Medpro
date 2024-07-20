import React from 'react';
import Header from '../../components/Header';
import styles from './Layout.module.scss';

const LayoutHeader = ({ children }) => {
    return (
        <>
            <Header />
            <div className={styles.mainCntainer}>
                {children}
            </div>
        </>
    );
};

export default LayoutHeader;