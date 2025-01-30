// import { render, screen } from '@testing-library/react';
// import { expect, test } from '@testing-library/jest-dom';
// import { MemoryRouter, Routes, Route } from 'react-router-dom';
// import PrivateRoute from '../ProtectedRoute';
// import { UserProvider } from '../../contexts/UserContext';

// const TestComponent = () => {
// <div>Protected Content</div>;

// }
// test('redirects to home when not authenticated', () => {
//   render(
//     <UserProvider value={{ isLoggedIn: false }}>
//       <MemoryRouter initialEntries={['/protected']}>
//         <Routes>
//           <Route element={<PrivateRoute />}>
//             <Route path="/protected" element={<TestComponent />} />
//           </Route>
//           <Route path="/" element={<div>Home Page</div>} />
//         </Routes>
//       </MemoryRouter>
//     </UserProvider>
//   );

//   expect(screen.getByText('Home Page')).toBeInTheDocument();
// });

// test('allows access when authenticated', () => {
//   render(
//     <UserProvider value={{ isLoggedIn: true }}>
//       <MemoryRouter initialEntries={['/protected']}>
//         <Routes>
//           <Route element={<PrivateRoute />}>
//             <Route path="/protected" element={<TestComponent />} />
//           </Route>
//         </Routes>
//       </MemoryRouter>
//     </UserProvider>
//   );

//   expect(screen.getByText('Protected Content')).toBeInTheDocument();
// });