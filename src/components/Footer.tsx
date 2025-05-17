
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background py-4 text-center text-sm text-muted-foreground border-t border-border">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} OwnChain. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
