import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    cartItems: [
      {
        quantity: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    roles: {
      type: [String],
      enum: ['user', 'admin'],
      default: ['user'],
    },
  },

  { timestamps: true }
)

// Pre save hook to hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return 
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
   
  } catch (error) {
    console.error(error)
   
  }
})
// Method to compare password for login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
export default User
