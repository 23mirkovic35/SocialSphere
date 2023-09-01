import React from 'react'
import Logo from './Logo'
import { FaXmark } from 'react-icons/fa6';
import '../styles/ReadMore.css'

function ReadMore(props) {
  return (
    <div className='ReadMore'>
        <div className="more-about">
            <button onClick={()=>{props.setShowMore(false)}}> <FaXmark size={20}/></button>
            <div className="logo-container">
                <Logo isHome={false}/>  
            </div>
            <div className="more-content">
                In this ever-connected world, SocialSphere is more than just a social network, it's a dynamic community that transcends borders, linking individuals globally through their fervent interests, united goals, and cherished memories. <br/><br/>
                At the heart of SocialSphere lies the belief that every visage carries a narrative deserving of expression, and each utterance, image, or video has the potential to forge connections amongst us. Our essence is a tapestry woven with diversity, and it's this very diversity that we exult – nurturing conversations that ignite inspiration, cultivate progress, and reveal uncharted horizons. <br/><br/>
                Our platform serves as a haven, a secure haven where you can unveil your moments to dear ones, reunite with old confidantes, and cross paths with new kindred spirits who mirror your passions. Be it as a creator, an explorer, a trailblazer, or a lover of tales, SocialSphere offers you your niche, where you'll find compatriots who resonate with your universe.<br/><br/>
                In the realm of SocialSphere, interactions extend beyond the screen, shaping real connections and shared memories that interlace to form an intricate, vibrant tapestry of human experiences. Join us in crafting this tapestry, where borders blur, horizons expand, and where you, too, contribute to the grand symphony of life's stories. Welcome to SocialSphere – a convergence of souls, a nexus of stories, and a celebration of our global mosaic.
            </div>   
        </div>
    </div>
  )
}

export default ReadMore;