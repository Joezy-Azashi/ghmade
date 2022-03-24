import getPost from '../components/jesttest/jsplht';

describe('Testing jsonplace holder endpoints',()=>{
    test('Testing get fn from jph',async()=>{
        const rs = await getPost();
        console.log(rs);
        expect(rs.length).toBeGreaterThan(0);
    })
})