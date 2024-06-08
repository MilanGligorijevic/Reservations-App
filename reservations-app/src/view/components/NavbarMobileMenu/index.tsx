import React, { useEffect } from "react";
import { motion, useAnimate } from 'framer-motion';

interface NavbarMobileMenuProps {
    toggleMenu: boolean;
}

export const NavbarMobileMenu = ({ toggleMenu }: NavbarMobileMenuProps) => {
    const [scope1, animate1] = useAnimate();
    const [scope2, animate2] = useAnimate();
    const [scope3, animate3] = useAnimate();

    useEffect(() => {
        if (toggleMenu) {
            animate1(
                scope1.current,
                {
                    rotateZ: 45,
                    y: 6,
                },
                { duration: 0.1 }
            );
            animate2(scope2.current, { opacity: 0 }, { duration: 0.1 });
            animate3(scope3.current, { rotateZ: -45, y: -6 }, { duration: 0.1 });
        } else {
            animate1(scope1.current, { rotateZ: 0, y: 0 }, { duration: 0.1 });
            animate2(scope2.current, { opacity: 1 }, { duration: 0.1 });
            animate3(scope3.current, { rotateZ: 0, y: 0 }, { duration: 0.1 });
        }
    });

    return (
        <motion.div>
            <motion.svg
                className="mb-0.5 z-50"
                width="42"
                height="4"
                viewBox="0 0 45 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ref={scope1}
            >
                <path
                    d="M2 2H43"
                    stroke="#F96D00"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <defs>

                </defs>
            </motion.svg>
            <motion.svg
                className="mb-0.5"
                width="42"
                height="4"
                viewBox="0 0 45 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ref={scope2}
            >
                <path
                    d="M2 2H43"
                    stroke="#F96D00"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

            </motion.svg>
            <motion.svg
                width="42"
                height="4"
                viewBox="0 0 45 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ref={scope3}
            >
                <path
                    d="M2 2H43"
                    stroke="#F96D00"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

            </motion.svg>
        </motion.div>
    )
}