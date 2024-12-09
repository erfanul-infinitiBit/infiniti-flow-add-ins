import gulp from 'gulp';
import { deleteAsync } from 'del';
import fs from 'fs';
import zip from 'gulp-zip';

// Define file paths
const paths = {
  dist: './dist',
  manifest: './manifest.xml',
  package: './package',
  temp: './temp'
};

// Clean directories
const clean = async () => {
  await deleteAsync([paths.package, paths.temp]);
};

// Package the add-in for production
const packageSolution = () => {
  const isShip = process.argv.includes('--ship');
  console.log('Starting package creation...');
  
  // Create directories
  if (!fs.existsSync(paths.package)) {
    fs.mkdirSync(paths.package, { recursive: true });
  }
  if (!fs.existsSync(paths.temp)) {
    fs.mkdirSync(paths.temp, { recursive: true });
  }

  return gulp.src([
    `${paths.dist}/**/*`,    // All files from dist
    paths.manifest,          // Manifest file
  ], { base: '.', allowEmpty: true })
  .pipe(gulp.dest(paths.temp))
  .pipe(zip(`${isShip ? 'prod' : 'debug'}-package.zip`))
  .pipe(gulp.dest(paths.package))
  .on('end', () => console.log('Package creation completed'));
};

// Define complex tasks
const pack = gulp.series(clean, packageSolution);

// Export tasks
export {
  clean,
  pack as package
};