import React, { useEffect } from 'react'
//import { Motion } from 'framer-motion'
import ArticleCard from '../articles/ArticleCard'
import adhd from '../../assets/adhd.jpg'
import anxiety from '../../assets/anxiety.jpg'
import depression from '../../assets/depression.jpg'
import sleepDisorder from '../../assets/sleepDisorder.jpg'
import { Link } from 'react-router-dom';
import { article_list } from '../../components/articles/articleArray';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MentalHealthIssues = () => {


    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2, // Trigger when 20% of the card is visible
        triggerOnce: false, // Only trigger the animation once
    });
    
    useEffect(() => {
        if (inView) {
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        });
        } else {
        controls.start({
            opacity: 0,
            y: 50,
        });
        }
    }, [controls, inView]);

      

  return (
    <div className='h-[600px] bg-[#f6c899]'>
        <div className='flex flex-col justify-center items-center p-10'>
            <h1 className='text-5xl items-center mb-16'>Mental Health Resources</h1>
            <div className='flex flex-row gap-4'>

    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // Start hidden and slightly translated down
      animate={controls} // Animate based on scroll
      className="p-4"
      
    >

                <Link  to={`/article/${article_list[0][0]}`} key={article_list[0][0]}>
                <ArticleCard
                        title={'Depression'}
                        img={depression}
                        quote={'Even the darkest nights will end, and the sun will rise.'}/>
                 </Link>
                 </motion.div>

                 <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // Start hidden and slightly translated down
      animate={controls} // Animate based on scroll
      className="p-4"
    >
                <Link to={`/article/${article_list[1][0]}`} key={article_list[0][0]}>
                <ArticleCard
                 title={'Anxiety'} 
                 img={anxiety}
                quote={'Anxiety is just a story you tell yourself; rewrite it.'}/>
                 </Link>
                 </motion.div>
                 <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // Start hidden and slightly translated down
      animate={controls} // Animate based on scroll
      className="p-4"
    >
                <Link to={`/article/${article_list[2][0]}`} key={article_list[0][0]}>
                <ArticleCard 
                title={'ADHD'} 
                img={adhd}
                quote={'Embrace your unique mind; it is your greatest strength.'}/>
                </Link>
                </motion.div>
                <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // Start hidden and slightly translated down
      animate={controls} // Animate based on scroll
      className="p-4"
    >

                <Link to={`/article/${article_list[3][0]}`} key={article_list[0][0]}>
                <ArticleCard 
                title={'Sleep Disorder'} 
                img={sleepDisorder}
                quote={'Good sleep is the foundation of a good day.'}/>
                </Link>
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default MentalHealthIssues