import React from 'react';
import { Link } from 'react-router-dom';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import Menu from '../components/Menu';

const Single = () => {
  return (
    <div className='single'>
      <div className='content'>
        <img
          src='https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt=''
        />
        <div className='user'>
          <img
            src='https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            alt=''
          />
          <div className='info'>
            <span>userName</span>
            <p>Posted 4 days ago</p>
          </div>
          <div className='edit'>
            <Link to={`/write?edit=`}>
              <img src={Edit} alt='' />
            </Link>
            <img src={Delete} alt='' />
          </div>
        </div>
        <h1>Title</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          semper ac orci vitae pretium. Suspendisse sed nunc et mi suscipit
          commodo. In blandit, libero rutrum pretium sollicitudin, magna nisi
          lacinia urna, at congue eros augue in lorem. Morbi maximus dolor vitae
          consequat sagittis. Maecenas vel dui felis. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Suspendisse leo tellus, eleifend quis enim vehicula, consectetur
          elementum nisl. Curabitur ornare quis ex quis pharetra. <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          semper ac orci vitae pretium. Suspendisse sed nunc et mi suscipit
          commodo. In blandit, libero rutrum pretium sollicitudin, magna nisi
          lacinia urna, at congue eros augue in lorem. Morbi maximus dolor vitae
          consequat sagittis. Maecenas vel dui felis. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Suspendisse leo tellus, eleifend quis enim vehicula, consectetur
          elementum nisl. Curabitur ornare quis ex quis pharetra. <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          semper ac orci vitae pretium. Suspendisse sed nunc et mi suscipit
          commodo. In blandit, libero rutrum pretium sollicitudin, magna nisi
          lacinia urna, at congue eros augue in lorem. Morbi maximus dolor vitae
          consequat sagittis. Maecenas vel dui felis. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Suspendisse leo tellus, eleifend quis enim vehicula, consectetur
          elementum nisl. Curabitur ornare quis ex quis pharetra. <br />
          <br />
        </p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
